import { ProductActionType } from '@modules/product/entities/product-action.interface';
import * as NAVIGATE_ from '@commons/constants/navigate.constants';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import {
  MEDIA_ACTIVATION_ACTIVATE_PRODUCT,
  WALLET_CARD_LIST
} from '@commons/constants/navigate.constants';
import {
  CANCEL_PRODUCT_BALANCE_ERROR,
  NO_AVAILABLE_ADVANCE_BALANCE_ERROR
} from '@modules/product-detail/constants/product-detail.constants';
import { DigitalDebitCard } from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { CancelAccountModalComponent } from '@modules/product-options/cancel-account/components/cancel-account-modal/cancel-account-modal.component';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AlertOptionsModalComponent } from '@commons/components/alert-options-modal/alert-options-modal.component';
import { TypeAccount } from '@commons/entities/product/type-account';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';

export function actionSelectedFnHelper(
  product: ProductDetail
): Record<string, () => void> {
  return {
    [ProductActionType.Transfer]: () => {
      this.setProductSelected(product);
      this.navCtrl.navigateForward(NAVIGATE_.TRANSFER_CONTACTS);
    },
    [ProductActionType.MobileRecharge]: () => {
      this.setProductSelected(product);
      this.navCtrl.navigateForward(NAVIGATE_.RECHARGES);
    },
    [ProductActionType.RealizeAdvance]: async () => {
      if (product.availableAdvanceBalance <= 0) {
        await this.alertService.create({
          ...NO_AVAILABLE_ADVANCE_BALANCE_ERROR
        });
        return;
      }
      this.setProductSelected(product);
      await this.navCtrl.navigateForward(NAVIGATE_.CARD_ADVANCE);
    },
    [ProductActionType.UseQuota]: () => {
      this.setProductSelected(product);
      this.navCtrl.navigateForward(NAVIGATE_.USE_QUOTA);
    },
    [ProductActionType.WithoutCard]: () => {
      this.setProductSelected(product);
      this.navCtrl.navigateForward(NAVIGATE_.CASH_WITHDRAWAL);
    },
    [ProductActionType.MoneyOrder]: () => {
      this.setProductSelected(product);
      this.navCtrl.navigateForward(NAVIGATE_.MONEY_ORDER);
    },
    [ProductActionType.Pockets]: () => {
      this.navCtrl.navigateForward(NAVIGATE_.POCKETS);
    },
    [ProductActionType.Documents]: () => {
      this.setProductSelected(product);
      this.navCtrl.navigateForward(NAVIGATE_.DOCUMENTS);
    },
    [ProductActionType.Payments]: () => {
      this.navCtrl.navigateForward(NAVIGATE_.PAYMENTS);
    },
    [ProductActionType.DirectedPayments]: () => {
      this.setProductSelected(product);
      this.navCtrl.navigateForward(NAVIGATE_.DIRECTED_PAYMENTS);
    },
    [ProductActionType.UpdateInstallments]: () => {
      this.setProductSelected(product);
      this.navCtrl.navigateForward(NAVIGATE_.UPDATE_INSTALLMENTS);
    },
    [ProductActionType.DebtPurchase]: () => {
      this.setProductSelected(product);
      this.navCtrl.navigateForward(NAVIGATE_.DEBIT_PURCHASE);
    },
    [ProductActionType.Security]: () => {
      this.navCtrl.navigateForward(NAVIGATE_.SECURITY_HOME);
    },
    [ProductActionType.BlockCard]: () => {
      this.facade.setBlockProductStep();
      this.facade.setBlockMediaActivationType();
      this.navCtrl.navigateForward(
        MEDIA_ACTIVATION_ACTIVATE_PRODUCT + `/${product.id}`
      );
    },
    [ProductActionType.ConfigCards]: async () => {
      if ([TypeAccount.CCA].includes(this.accountType)) {
        await this.navCtrl.navigateForward(NAVIGATE_.MEDIA_ACTIVATION);
        return;
      }
      const options = [
        {
          id: 'block-card-temporarily-option',
          icon: 'icon-seguridad2',
          text: 'Bloquear temporalmente / Desbloquear',
          callback: () => {
            this.modalCtrl.dismiss();
            this.navCtrl.navigateForward(
              '/block-card-temporarily/' + this.params.id
            );
          }
        },
        {
          id: 'lost-card-block-option',
          icon: 'icon-no_se_puede',
          text: 'Bloqueo por perdida o robo',
          callback: () => {
            this.modalCtrl.dismiss();
            this.navCtrl.navigateForward(NAVIGATE_.MEDIA_ACTIVATION);
          }
        },
        {
          id: 'set-key-card-option',
          icon: 'icon-seguridad',
          text: 'Configurar clave',
          callback: () => {
            this.modalCtrl.dismiss();
            this.navCtrl.navigateForward(NAVIGATE_.MEDIA_ACTIVATION);
          }
        }
      ];
      const modal = await this.modalCtrl.create({
        id: 'configure-cards-options',
        component: AlertOptionsModalComponent,
        componentProps: {
          title: 'Configurar tarjeta',
          options
        },
        mode: 'md',
        cssClass: 'avv-custom-modal'
      });
      await modal.present();
    },
    [ProductActionType.BlockAccount]: () => {
      this.setProductSelected(product);
      this.navCtrl.navigateForward('/block-account');
    },
    [ProductActionType.CancelAccount]: async () => {
      const minValueToCancelAccount: number = this.facade.boundsByKey(
        ParameterKey.minValueToCancelAccount
      );
      if (product.balance > minValueToCancelAccount) {
        await this.alertService.create({
          ...CANCEL_PRODUCT_BALANCE_ERROR
        });
        return;
      }
      const digitalDebitCards: DigitalDebitCard[] =
        this.facade.digitalDebitCards$.currentValue();
      const hasDigitalDebitCard = digitalDebitCards?.find(
        (digitalDebitCard) => digitalDebitCard.relativeParentId === product.id
      );

      const modal = await this.modalCtrl.create({
        component: CancelAccountModalComponent,
        componentProps: {
          hasDigitalDebitCard: !isNullOrUndefined(hasDigitalDebitCard)
        },
        mode: 'md',
        cssClass: 'avv-custom-modal'
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      if (data) {
        this.cancelAccountFacade.cancelAccount({
          relativeIdProduct: product.id,
          numberProduct: product.numberProduct,
          ...(hasDigitalDebitCard
            ? { numberDigitalCard: hasDigitalDebitCard.numberDigitalCard }
            : {}),
          ...(this.product?.productTypeDetailKey
            ? { typeAccountCancellation: this.product.productTypeDetailKey }
            : {})
        });
      }
    },
    [ProductActionType.ApplePay]: () => {
      void this.navCtrl.navigateForward(WALLET_CARD_LIST);
    },
    [ProductActionType.Remittances]: () => {
      void this.navCtrl.navigateForward(NAVIGATE_.REMITTANCES, {
        queryParams: {
          from: this.router.url
        }
      });
    }
  };
}
