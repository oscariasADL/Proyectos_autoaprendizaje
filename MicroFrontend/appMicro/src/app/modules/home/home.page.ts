/* eslint-disable max-lines */
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';
import { from, Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { getUnixTime } from 'date-fns';

import { HomeProduct } from '@commons/entities/product/balance.interface';
import { SplashScreenService } from '@commons/services/splash-screen.service';
import { removeSubscriptions } from '@commons/utils/util';
import { DigitalDebitCard } from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import {
  HOME_COMPLEMENTARY_SERVICES_ALERT,
  HOME_COMPLEMENTARY_SERVICES_ERROR_ALERT,
  HOME_EXTERNAL_REDIRECTION_ALERT,
  MATHILDE_URL_INPUT_ID,
  TIME_TO_REFRESH
} from '@modules/home/constants/home.constants';
import {
  HomeAlertIds,
  HomeAlertProperties,
  SHOULD_NOT_DELETE_ALERT_ON_CLICK
} from './entities/home-alert.entities';
import { HomeFacade } from './home.facade';
import { FavoriteBasic } from '@modules/favorites/entities/favorites.interface';
import { ParameterType } from '@store/state/parameter.state';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import { PopupSecurityAlertComponent } from '@commons/components/popup-security-alert/popup-security-alert.component';
import { ModalController } from '@commons/controllers/modal.controller';
import { AlertService } from '@commons/services/alert.service';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { AdlSecureStorageService } from '@app/commons/services/adl-secure-storage.service';
import { getDBValue } from '@app/commons/helpers/text.helpers';
import { SecureKeys } from '@app/commons/constants/keys.constants';
import { SpiConsentService } from '@app/commons/services/spi-consent-service/spi-consent.service';
import { SPIAuthTxResponse } from './entities/spi-channel.entities';
import { transferPayloadMapper } from './mappers/transactions.mapper';
import { MICROFRONTEND_TOPICS } from '@app/commons/constants/microfrontend-events.constants';
import { BreBTransfersFacade } from '../transfers/pages/bre-b-transfers/bre-b-transfers.facade';
import { mapHomeModalInfo } from './mappers/home.mapper';
import { BigPictureMapperProps } from '@app/commons/entities/alert/alert-sheet.entities';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.sass']
})
export class HomePage implements OnInit, OnDestroy {
  public timeoutRefresher: number = null;
  public readonly featureFlagsKey = FeatureFlagsKey;
  private subscriptions: Subscription[] = [];
  private spiConsentService = inject(SpiConsentService);
  private featureValSubscription: Subscription;
  private authorizeTransaction = this.facade.eventBus.accessTopic(
    MICROFRONTEND_TOPICS.AUTHORIZE_TRANSACTION
  );

  @ViewChild(IonRefresher, { static: false })
  ionRefresher: IonRefresher;

  constructor(
    private facade: HomeFacade,
    private breBTransfersFacade: BreBTransfersFacade,
    private splashScreen: SplashScreenService,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private secureStorage: AdlSecureStorageService
  ) {}

  ngOnInit(): void {
    this.facade.closeToast();
    this.facade.fetchHomeProducts();
    this.facade.fetchFavorites();
    this.facade.fetchNotifications();
    this.facade.getHiddenBalanceFromSecureStorageAction();
    this.listenerComplementaryServices();
    this.facade.trackUuid();
    this.facade.resetFirstCallTC();
    this.showPopUpAlertSecurity();
    this.verifyPushNotification();
    this.spiConsentService.fetchSpiConsent();
    this.subscribeToAuthTx();
    this.homeAlert();
  }

  private async verifyPushNotification() {
    const db = await this.secureStorage.getAll();
    const pushNotification = getDBValue(db, SecureKeys.pushNotification);

    if (!!pushNotification) {
      this.facade.dispatchNotification(pushNotification);
      this.secureStorage.remove(SecureKeys.pushNotification);
    }
  }
  private homeAlert() {
    const isOn = this.facade.featureFlagsByKey(FeatureFlagsKey.HomePopUpToggle);
    if (isOn) {
      const value = this.facade.featureFlagsByKey(
        FeatureFlagsKey.HomePopUp
      ) as string;
      if (typeof value === 'string') {
        const json = JSON.parse(value);

        const popupData: BigPictureMapperProps = mapHomeModalInfo(json);
        const ok = from(this.alertService.create(popupData)).subscribe();
        this.subscriptions.push(ok);
      }
    }
  }

  public async ionViewDidEnter(): Promise<void> {
    await this.onEnter();
  }

  ngOnDestroy(): void {
    removeSubscriptions(this.subscriptions);
  }

  ionViewWillLeave() {
    this.facade.closeToast();
  }
  private subscribeToAuthTx() {
    this.featureValSubscription = this.facade
      .isFeatureFlagEnabled(FeatureFlagsKey.SpiSecondFactor)
      .subscribe((isEnabled) => {
        if (isEnabled) {
          this.authorizeTransaction.subscribe((tx: SPIAuthTxResponse) => {
            const payload = transferPayloadMapper(tx);
            if (payload) {
              this.facade.evalTx(payload);
            }
          });
        }
      });
    this.subscriptions.push(this.featureValSubscription);
  }

  public goActionAlert(id: HomeAlertIds): void {
    if (!SHOULD_NOT_DELETE_ALERT_ON_CLICK.includes(id)) {
      this.facade.removeHomeAlert(id);
    }
  }

  public doRefresh(event: CustomEvent): void {
    const currentUnixTime = getUnixTime(new Date());
    const differenceTime = currentUnixTime - this.homeTimer;
    if (differenceTime >= TIME_TO_REFRESH) {
      clearTimeout(this.timeoutRefresher);
      this.facade.fetchProducts();
      this.facade.fetchFavorites();
      this.facade.fetchNotifications();
      this.balanceWorking$
        .pipe(
          filter((isLoading) => !isLoading),
          take(1)
        )
        .subscribe(() => void this.ionRefresher.complete());
      this.ionRefresher.disabled = true;
      this.facade.setHomeTimer(currentUnixTime);
      this.timeoutRefresher = window.setTimeout(
        () => (this.ionRefresher.disabled = false),
        TIME_TO_REFRESH * 1000
      );
      return;
    }
    this.ionRefresher.complete();
  }

  public async onEnter(): Promise<void> {
    await this.splashScreen.hideSplashScreen();
    this.facade.disableLoading();
  }

  public interceptMathildeAdds(event: MouseEvent) {
    const mathildeAddsUrlInput: HTMLInputElement = document.querySelector(
      MATHILDE_URL_INPUT_ID
    );
    if (!!mathildeAddsUrlInput) {
      event.preventDefault();
      this.facade
        .redirectAlert('REDIRECT_ALERT.TITLE', 'REDIRECT_ALERT.DESCRIPTION', [
          'REDIRECT_ALERT.BUTTONS.OK',
          'REDIRECT_ALERT.BUTTONS.CANCEL'
        ])
        .then((confirm) => {
          if (confirm) {
            window.open(mathildeAddsUrlInput.value);
            this.facade.logout();
          }
        });
    }
  }

  private listenerComplementaryServices(): void {
    this.subscriptions.push(
      this.facade.complementaryServicesState$.subscribe((state) => {
        if (!state) {
          if (this.facade.complementaryServicesError$.currentValue()) {
            this.facade.putHomeAlertAction(
              HOME_COMPLEMENTARY_SERVICES_ERROR_ALERT
            );
          } else {
            this.facade.putHomeAlertAction(HOME_COMPLEMENTARY_SERVICES_ALERT);
          }
        } else {
          this.facade.removeHomeAlert(HomeAlertIds.COMPLEMENTARY_SERVICES);
        }
      })
    );
  }

  private async showPopUpAlertSecurity(): Promise<void> {
    const featureFlag = this.facade.featureFlagsByKey(
      FeatureFlagsKey.PopUpAlertSecurity
    ) as boolean;

    this.facade
      .parameterByKey(ParameterType.securityCampaignsBm)
      .subscribe((info) => {
        this.handleSecurityCampaign(info, featureFlag);
      });
  }

  private async handleSecurityCampaign(
    info: any,
    featureFlag: boolean
  ): Promise<void> {
    const campaign = info?.campaigns.find((item) => item.enable);
    if (campaign && featureFlag) {
      const modal = await this.modalCtrl.create({
        component: PopupSecurityAlertComponent,
        componentProps: campaign,
        mode: 'md',
        cssClass: 'avv-custom-modal'
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data && campaign && campaign.isOpenExternalLink) {
        const confirm = await this.alertService.create(
          HOME_EXTERNAL_REDIRECTION_ALERT
        );
        if (!!confirm) {
          this.facade.logout();
          this.facade.redirectExternal(LinkKey[campaign.linkKey], '_blank');
        }
      }
    }
  }

  public openExternalLink(url: LinkKey): void {
    this.facade.openExternalLinks(this.facade.linkByKey(url));
  }
  get hasCreditProductError$(): Observable<boolean> {
    return this.facade.creditProductsError$;
  }
  get homeProduct$(): Observable<HomeProduct[]> {
    return this.facade.homeProduct$;
  }
  get digitalDebitCards$(): Observable<DigitalDebitCard[]> {
    return this.facade.digitalDebitCards$;
  }
  get showPockets$(): Observable<boolean> {
    return this.facade.showPockets$;
  }
  get balanceWorking$(): Observable<boolean> {
    return this.facade.balanceWorking$;
  }
  get balanceCompleted$(): Observable<boolean> {
    return this.facade.balanceCompleted$;
  }
  get firstCall$(): Observable<boolean> {
    return this.facade.firstCall$;
  }
  get homeAlerts$(): Observable<HomeAlertProperties[]> {
    return this.facade.homeAlerts$;
  }
  get favorites$(): Observable<FavoriteBasic[]> {
    return this.facade.favoritesBasic$;
  }
  get homeTimer() {
    return this.facade.homeTimer$?.currentValue() ?? 0;
  }
}
