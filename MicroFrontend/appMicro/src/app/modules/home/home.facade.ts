import { Injectable, Injector } from '@angular/core';
import { HomeProduct } from '@commons/entities/product/balance.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import * as digitalDebitCardsActions from '@modules/digital-debit-card/store/digital-debit-card.actions';
import { ProductFacade } from '@modules/product/product.facade';
import {
  balanceCompletedSelector,
  balanceWorkingSelector,
  hasProductsSelector,
  isSPIAuthorizationSelector,
  productsHome
} from '@modules/product/store/product.selector';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of, Subscription, timer } from 'rxjs';
import * as productsActions from '../product/store/product.actions';
import {
  HomeAlertIds,
  HomeAlertProperties
} from './entities/home-alert.entities';
import * as homeActions from './store/home.actions';
import {
  homeAlertsSelector,
  homeCreditProductsError,
  homeHasCreditProducts,
  homeTimerSelector
} from './store/home.selector';
import * as favoritesActions from '@modules/favorites/store/favorites.actions';
import { FavoriteBasic } from '@modules/favorites/entities/favorites.interface';
import { favoritesBasicSelector } from '@modules/favorites/store/favorites.selector';
import { fetchProductsFirstCallToggleAction } from '../product/store/product.actions';
import { getDBValue } from '@commons/helpers/text.helpers';
import { SecureKeys } from '@commons/constants/keys.constants';
import { environment } from '@environment';
import { TagEventType } from '@commons/entities/analytics/events.entities';
import { DocumentNames } from '@modules/home/constants/home.constants';
import { State } from '@store/state/state';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { DOCUMENTS } from '@commons/constants/navigate.constants';
import { AlertService } from '@commons/services/alert.service';
import { CARE_CHANNELS_BENEFITS_ALERT } from '@modules/care-channels/constants/care-channels.constants';
import {
  AlertComponentType,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import * as mailboxActions from '@app/store/actions/mailbox.action';

declare let utag;

@Injectable()
export class HomeFacade extends ProductFacade {
  constructor(
    protected store: Store<State>,
    protected injector: Injector,
    private secureStorage: AdlSecureStorageService,
    private alertService: AlertService
  ) {
    super(store, injector);
  }

  public timerInterval$: Subscription;
  public homeProduct$: Observable<HomeProduct[]> = this.store.pipe(
    select(productsHome)
  );

  public intervalTimer = new BehaviorSubject(0);

  public homeAlerts$: Observable<HomeAlertProperties[]> = this.store.pipe(
    select(homeAlertsSelector)
  );

  public balanceWorking$: Observable<boolean> = this.store.pipe(
    select(balanceWorkingSelector)
  );

  public balanceCompleted$: Observable<boolean> = this.store.pipe(
    select(balanceCompletedSelector)
  );

  public showPockets$: Observable<boolean> = this.store.pipe(
    select(hasProductsSelector(), {
      typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
    })
  );

  public favoritesBasic$: Observable<FavoriteBasic[]> = this.store.pipe(
    select(favoritesBasicSelector)
  );

  public homeTimer$: Observable<number> = this.store.pipe(
    select(homeTimerSelector)
  );

  public hasCreditProducts$: Observable<boolean> = this.store.pipe(
    select(homeHasCreditProducts)
  );

  public creditProductsError$: Observable<boolean> = this.store.pipe(
    select(homeCreditProductsError)
  );

  public fetchHomeProducts(): void {
    if (this.homeProduct$.currentValue().length === 0) {
      this.fetchProducts();
    }
  }

  public fetchProductsFirstCallToggleAction(): void {
    this.store.dispatch(fetchProductsFirstCallToggleAction());
  }

  public fetchDigitalDebitCards(): void {
    this.store.dispatch(
      digitalDebitCardsActions.fetchDigitalDebitCardsAction()
    );
  }

  public fetchFavorites(): void {
    this.store.dispatch(favoritesActions.fetchFavoritesAction());
  }

  public getHiddenBalanceFromSecureStorageAction(): void {
    this.store.dispatch(
      productsActions.getHiddenBalanceFromSecureStorageAction()
    );
  }

  public putHomeAlertAction(alert: HomeAlertProperties): void {
    this.store.dispatch(homeActions.putHomeAlertAction({ alert }));
  }

  public removeHomeAlert(id: HomeAlertIds): void {
    this.store.dispatch(homeActions.removeHomeAlertAction({ id }));
  }

  public setHomeTimer(time: number): void {
    this.store.dispatch(homeActions.setHomeTimerAction({ time }));
  }

  public setCreditProductsError(creditProductsError: boolean): void {
    this.store.dispatch(
      homeActions.setHomeCreditProductsErrorAction({ creditProductsError })
    );
  }

  public dispatchNotification(notification: any): void {
    this.store.dispatch(
      mailboxActions.pushNotificationSavedAction({ notification })
    );
  }

  public trackUuid(): void {
    this.secureStorage.getAll().then((db) => {
      const { typeDocument, document } = JSON.parse(
        getDBValue(db, SecureKeys.loginData)
      );
      if (environment.tealium) {
        try {
          (window as any).utag_cfg_ovrd = { noview: true };
          (window as any).utag_data = {};
          utag.data.uuid_dt = DocumentNames[typeDocument];
          utag.data.uuid_nd = document;
          utag.track(TagEventType.View, {
            eventType: 'PageView',
            pagePath: '/',
            pageName: 'Home'
          });
        } catch (err) {}
      }
    });
  }

  public async redirectAlert(
    title: string,
    description: string,
    buttons: string[],
    icon: string = 'illustrationsV2/cerrar-sesion-regular.svg',
    id: string = 'redirect-alert-modal'
  ): Promise<any> {
    return await this.alertService.create({
      id,
      type: AlertSheetType.question,
      componentType: AlertComponentType.alertSheet,
      icon,
      title,
      description,
      buttons
    });
  }

  public fetchSPIAuthorization(): void {
    this.store.dispatch(productsActions.fetchSPIAuthorizationAction());
  }

  public acceptSpiConsent(): void {
    this.store.dispatch(productsActions.acceptSpiConsentAction());
  }

  public isSPIAuthorization$: Observable<boolean> = this.store.pipe(
    select(isSPIAuthorizationSelector)
  );
}
