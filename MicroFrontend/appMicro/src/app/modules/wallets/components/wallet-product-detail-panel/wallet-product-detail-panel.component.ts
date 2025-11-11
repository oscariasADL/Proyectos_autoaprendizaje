import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { from, Observable, of, timeout, catchError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { WALLET_CARD_LIST } from '@commons/constants/navigate.constants';
import { TypeAccount } from '@commons/entities/product/type-account';
import { WalletsFacade } from '@modules/wallets/wallets.facade';
import { Platform } from '@commons/constants/global.constants';
import { DigitalWalletContextService } from '@modules/wallets/services/digital-wallet-context.service';
import { DigitalWalletStrategyProvider } from '@modules/wallets/digital-wallet-provider';
import { handleWalletProvisioningStatusEvents } from '@modules/wallets/helpers/provisioning.helpers';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';

@Component({
  selector: 'app-wallet-product-detail-panel',
  templateUrl: './wallet-product-detail-panel.component.html',
  styleUrls: [
    './wallet-product-detail-panel.component.sass',
    '../../styles/google-wallet-btn.sass'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, GlobalPipesModule],
  providers: [
    WalletsFacade,
    DigitalWalletContextService,
    DigitalWalletStrategyProvider
  ]
})
export class WalletProductDetailPanelComponent implements OnInit {
  @Input() typeAccount: TypeAccount;
  @Input() id: string;
  @Input() isVirtualCard: boolean = false;

  protected readonly CREDIT_CARDS_TYPES = [TypeAccount.CCA];
  protected readonly ACCOUNT_TYPES = [TypeAccount.SDA];
  public readonly platform = Platform;
  public canPushCreditCard: Observable<boolean>;
  public maxTimeout: number = 5000;

  constructor(
    private navCtrl: NavController,
    private digitalWalletContextService: DigitalWalletContextService,
    private facade: WalletsFacade
  ) {}

  ngOnInit() {
    if (this.typeAccount === TypeAccount.CCA) {
      this.canPushCreditCard = this.canPushCreditCardValidation();
    }
  }

  public isEnableGoogleWalletBanner(): boolean {
    return !!this.facade.featureFlagsByKey(FeatureFlagsKey.GoogleWalletBanner);
  }

  public initTokenization(): void {
    let [url] = WALLET_CARD_LIST;
    if (this.typeAccount === TypeAccount.CCA) {
      url += `?id=${this.id}&typeAccount=${this.typeAccount}`;
    }
    void this.navCtrl.navigateForward(url);
  }

  private canPushCreditCardValidation(): Observable<boolean> {
    const productId: string = this.isVirtualCard
      ? this.id
      : this.facade.getProduct(this.typeAccount, this.id).idUM;
    return from(this.digitalWalletContextService.validateWalletStatus())?.pipe(
      switchMap(() =>
        from(handleWalletProvisioningStatusEvents()).pipe(
          timeout(this.maxTimeout),
          catchError(() => of(false))
        )
      ),
      switchMap((provisioningStatus) => {
        if (!provisioningStatus) {
          return of(true);
        }

        return from(this.digitalWalletContextService.isWalletCreated()).pipe(
          switchMap((isCreated) => {
            if (!isCreated.wallet) {
              return of(true);
            }
            return from(
              this.digitalWalletContextService.getDigitalCardId({
                cardId: productId
              })
            ).pipe(
              switchMap((digitalCard) => {
                if (!digitalCard?.digitalCardId) {
                  return of(true);
                }
                return from(
                  this.digitalWalletContextService.canPushCardWalletPay({
                    cardId: digitalCard.digitalCardId
                  })
                ).pipe(map((result) => result?.canPushCardWalletPay ?? false));
              })
            );
          })
        );
      })
    );
  }

  get deviceOS(): Observable<string> {
    return this.facade.deviceInfo$.pipe(map(({ deviceOS }) => deviceOS));
  }
}
