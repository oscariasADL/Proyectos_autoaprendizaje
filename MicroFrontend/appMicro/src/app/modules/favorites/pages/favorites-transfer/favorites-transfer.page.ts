import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ACTION_LABEL,
  Favorite,
  HOMOLOGUE_TRANSFER_TYPE,
  IdentificationFavoriteType
} from '@modules/favorites/entities/favorites.interface';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { getDBValue, isNullOrUndefined } from '@commons/helpers/text.helpers';
import { SecureKeys } from '@commons/constants/keys.constants';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AlertService } from '@commons/services/alert.service';
import { FAVORITES_DELETE_ALERT } from '@modules/favorites/pages/favorites-home/constants/favorites-home.constants';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { mapToTransferConfirm } from '@modules/favorites/pages/favorites-transfer/mappers/favorites-transfer-confirm.mapper';
import { ModalController } from '@commons/controllers/modal.controller';
import { FavoritesAmountInputComponent } from '@modules/favorites/component/favorites-amount-input/favorites-amount-input';
import { FeeService } from '@commons/services/fee.service';
import { Fee } from '@commons/entities/fee/fee.interface';
import { Product } from '@commons/entities/product/product.interface';
import { FavoritesAccountInputComponent } from '@modules/favorites/component/favorites-account-input/favorites-account-input';
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  mapFavoriteMoneyOrdersVoucher,
  mapFavoritePaymentServiceVoucher,
  mapFavoriteRechargesVoucher,
  mapFavoriteTransfersVoucher,
  mapPayloadMoneyOrder,
  mapPayloadPaymentService,
  mapPayloadRecharge,
  mapPayloadTransfer
} from '@modules/favorites/pages/favorites-transfer/mappers/favorites-transfer-payload.mapper';
import { TransfersFacade } from '@modules/transfers/transfers.facade';
import { RechargesFacade } from '@modules/product-options/recharges/recharges.facade';
import { WithdrawFacade } from '@modules/withdraw/withdraw.facade';
import { FAVORITES } from '@commons/constants/navigate.constants';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { ChannelType } from '@modules/withdraw/entities/withdraw.interface';
import { EDITABLE_FIELDS_TO_TRANSFER } from '@modules/favorites/pages/favorites-transfer/constants/favorites-transfer.constants';
import { editFieldsFn } from '@modules/favorites/helpers/favorites-edit-fields.helper';
import { DeviceData } from '@app/commons/entities/device/device.interface';
import { CustomFacts } from '@app/modules/product-options/recharges/entities/recharges.interface';
import { mapCustomFacts } from '@app/modules/product-options/recharges/mappers/recharges-payload.mapper';

@Component({
  selector: 'app-favorites-transfer',
  templateUrl: './favorites-transfer.page.html',
  styleUrls: ['./favorites-transfer.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesTransferPage implements OnInit {
  public favorite$: Observable<Favorite> = new Observable();
  public sourceAccount: Product;
  public itemsConfirm$: Observable<VoucherItem[]> = new Observable();
  public transactionValue: number = 0;
  public operationCost: number = null;
  public hasInsufficientBalance: boolean = false;

  private customFacts: CustomFacts;

  protected currencyFormat: CurrencyFormatPipe;
  protected imageUrl: ImageUrlPipe;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private translate: TranslateService,
    private facade: FavoritesFacade,
    private transfersFacade: TransfersFacade,
    private rechargesFacade: RechargesFacade,
    private withDrawFacade: WithdrawFacade,
    private paymentServicesFacade: PaymentServicesFacade,
    private secureStorage: AdlSecureStorageService,
    private alertService: AlertService,
    private feeService: FeeService,
    private modalCtrl: ModalController,
    private cdRef: ChangeDetectorRef
  ) {
    this.currencyFormat = new CurrencyFormatPipe('en-US');
    this.imageUrl = new ImageUrlPipe();
  }

  ngOnInit(): void {
    this.fetchFavorite();
  }

  public fetchFavorite(): void {
    const params = this.route.snapshot.params;
    this.favorite$ = this.facade.getFavorite(params.key_favorite);
    const favorite = this.favorite$.currentValue() as Favorite;
    this.transactionValue =
      Number(favorite.amountTransaction) || this.transactionValue;
    this.sourceAccount = this.facade.getProduct(
      favorite.sourceAccountTransaction.typeAcctTransaction,
      favorite.sourceAccountTransaction.idAcctTransaction
    );
    this.hasInsufficientBalance = this.sourceAccount.availableBalance === 0;
    this.itemsConfirm$ = this.favorite$.pipe(
      map<Favorite, VoucherItem[]>((favoriteData) =>
        mapToTransferConfirm.bind(this)(favoriteData)
      ),
      map((itemsConfirm) =>
        itemsConfirm.filter((voucherItem) => voucherItem.id !== 'amount')
      )
    );
  }

  public async modifyAmount(): Promise<void> {
    const favorite = this.favorite$.currentValue() as Favorite;
    const modal = await this.modalCtrl.create({
      component: FavoritesAmountInputComponent,
      componentProps: {
        subTypeOperation: favorite.additionalDataTransaction.subtypeOperation,
        initValue: this.transactionValue,
        ...(favorite.additionalDataTransaction?.channel ===
        ChannelType.ATM.toString()
          ? {
              channel: favorite.additionalDataTransaction
                ?.channel as ChannelType
            }
          : {})
      },
      id: 'favorites-amount-input-modal',
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (!isNullOrUndefined(data) && !isNullOrUndefined(data.amount)) {
      await this.setValueAndCost(data.amount);
    }
  }

  public async modifyAccount(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: FavoritesAccountInputComponent,
      componentProps: {
        products: this.products,
        amount: this.transactionValue + this.operationCost
      },
      id: 'favorites-amount-input-account',
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (!isNullOrUndefined(data) && !isNullOrUndefined(data.product)) {
      const product = data.product as Product;
      const total = this.transactionValue + this.operationCost;
      this.hasInsufficientBalance = total > product.availableBalance;
      this.sourceAccount = product;
      this.favorite$ = this.favorite$.pipe(
        map((favorite) => {
          const newFavorite = JSON.parse(JSON.stringify(favorite));
          newFavorite.sourceAccountTransaction.typeAcctTransaction =
            product.type as TypeAccount;
          newFavorite.sourceAccountTransaction.idAcctTransaction = product.id;
          return newFavorite;
        })
      );
      this.itemsConfirm$ = this.favorite$.pipe(
        map((favorite) => mapToTransferConfirm.bind(this)(favorite))
      );
      this.cdRef.detectChanges();
    }
  }

  public async deleteFavorite(): Promise<void> {
    const db = await this.secureStorage.getAll();

    const { typeDocument, document } = JSON.parse(
      getDBValue(db, SecureKeys.loginData)
    );
    this.alertService.create(FAVORITES_DELETE_ALERT).then((confirm) => {
      if (confirm) {
        this.facade.deleteFavorite({
          userData: { idUserType: typeDocument, idUser: document },
          idFavoriteTransaction: this.route.snapshot.params.key_favorite
        });
        setTimeout(() => void this.navCtrl.navigateForward('/'), 500);
      }
    });
  }

  public executeAction(): void {
    const favorite = this.favorite$.currentValue() as Favorite;

    switch (favorite.identificationFavoriteType) {
      case IdentificationFavoriteType.TRANSFER:
        this.transfersFacade.transfer(
          mapPayloadTransfer(
            favorite,
            this.transactionValue,
            HOMOLOGUE_TRANSFER_TYPE[
              favorite.additionalDataTransaction.subtypeOperation
            ]
          ),
          {
            backUrl: FAVORITES,
            voucher: mapFavoriteTransfersVoucher.bind(this)(
              favorite,
              this.transactionValue
            )
          }
        );
        this.facade.editFavoriteBackground({ favoriteTransaction: favorite });
        break;
      case IdentificationFavoriteType.RECHARGE:
        this.rechargesFacade.recharge(
          mapPayloadRecharge(
            favorite,
            this.transactionValue,
            this.sourceAccount.availableBalance,
            this.customFacts
          ),
          {
            backUrl: FAVORITES,
            voucher: mapFavoriteRechargesVoucher.bind(this)(
              favorite,
              this.transactionValue
            )
          }
        );
        break;
      case IdentificationFavoriteType.MONEY_ORDER:
        this.withDrawFacade.withdraw(
          mapPayloadMoneyOrder(favorite, this.transactionValue),
          {
            backUrl: FAVORITES,
            voucher: mapFavoriteMoneyOrdersVoucher.bind(this)(
              favorite,
              this.transactionValue
            )
          }
        );
        break;
      case IdentificationFavoriteType.PAYMENT:
        this.paymentServicesFacade.payBill(
          mapPayloadPaymentService(favorite, this.transactionValue),
          {
            backUrl: FAVORITES,
            voucher: mapFavoritePaymentServiceVoucher.bind(this)(
              favorite,
              this.transactionValue
            )
          },
          true
        );
        break;
    }
  }

  public async modifyField(typeField: string) {
    const favorite = this.favorite$.currentValue();
    const newFavorite = await editFieldsFn[typeField].bind(this)(favorite);
    this.favorite$ = of(newFavorite);
    this.itemsConfirm$ = this.favorite$.pipe(
      map((fav) => mapToTransferConfirm.bind(this)(fav))
    );
    this.cdRef.detectChanges();
  }

  private async setValueAndCost(value: number): Promise<void> {
    this.facade.enableLoading();
    const favorite = this.favorite$.currentValue() as Favorite;
    this.transactionValue = value;
    const fee = await this.getFee(favorite, value);
    this.operationCost = fee.amount;
    const total = Number(this.transactionValue) + fee?.amount;
    this.hasInsufficientBalance = total > this.sourceAccount?.availableBalance;
    this.cdRef.detectChanges();
    this.facade.disableLoading();
  }

  private getFee(favorite: Favorite, amount: number): Promise<Fee> {
    return this.feeService
      .fetchCost({
        transactionId: favorite.additionalDataTransaction.transactionCostId,
        accountId: favorite.sourceAccountTransaction.idAcctTransaction,
        accountType: favorite.sourceAccountTransaction.typeAcctTransaction,
        amount
      })
      .toPromise();
  }

  get hasProducts(): Observable<boolean> {
    return this.facade.hasProducts$;
  }

  get products(): Product[] {
    return this.facade.products$.currentValue();
  }

  get actionLabel(): Observable<string> {
    return this.favorite$.pipe(
      map((favorite) => ACTION_LABEL[favorite.identificationFavoriteType])
    );
  }

  get editableFields(): string[] {
    return Object.values(EDITABLE_FIELDS_TO_TRANSFER);
  }
}
