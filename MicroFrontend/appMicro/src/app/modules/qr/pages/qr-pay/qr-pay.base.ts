import { Injector } from '@angular/core';
import { HOME, QR_PAY } from '@commons/constants/navigate.constants';
import { TypeAccount } from '@commons/entities/product/type-account';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { NavController } from '@ionic/angular';
import {
  QR_PAY_SCAN_ID,
  QrPaySlide
} from '@modules/qr/pages/qr-pay/constants/qr-pay.constants';
import { TrxPurpose } from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import {
  mapQrCancelPayload,
  mapQrPayPayload
} from '@modules/qr/pages/qr-pay/mappers/qr-pay-payload.mapper';
import { QrPayFacade } from '@modules/qr/pages/qr-pay/qr-pay.facade';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { mapTransferPayload } from '@modules/transfers/mappers/transfers-payload.mapper';
import { TransferType } from '@modules/transfers/entities/transfers.interface';

export class QrPayBase extends GenericStepperBase {
  protected facade: QrPayFacade;
  protected navCtrl: NavController;

  constructor(protected injector: Injector) {
    super(injector);
    this.facade = this.injector.get<QrPayFacade>(QrPayFacade);
    this.navCtrl = this.injector.get<NavController>(NavController);
  }

  public reScanQR(): void {
    this.navCtrl
      .navigateForward(HOME, {
        animated: false,
        skipLocationChange: false
      })
      .then(() =>
        this.navCtrl.navigateForward(QR_PAY, {
          animated: false
        })
      );
  }

  public async setNextStep(data: any): Promise<void> {
    const { slide: currentSlide, value } = data;
    switch (currentSlide) {
      case QrPaySlide.data:
        if (this.form.value.fromProduct.type === TypeAccount.CCA) {
          this.nextStep(QrPaySlide.installments);
        } else {
          this.setConfirmationData(QrPaySlide.confirmation);
        }
        break;

      case QrPaySlide.installments:
        this.setConfirmationData(QrPaySlide.confirmation);
        break;

      case QrPaySlide.confirmation:
        if (!isNullOrUndefined(value)) {
          if (value === QR_PAY_SCAN_ID) {
            this.reScanQR();
          } else {
            this.nextStep(value);
          }
        } else {
          if (this.isForPay) {
            this.payQR();
          } else {
            this.cancelQR();
          }
        }
    }
  }

  protected payQR(): void {
    if (this.form.valid) {
      const fromProduct = this.form.value.fromProduct;
      if (
        [TypeAccount.SDA, TypeAccount.CCA].includes(fromProduct.type) &&
        fromProduct?.accountIdUn
      ) {
        this.facade.payQR(
          mapQrPayPayload(this.form.value),
          this.alertStepData()
        );
        return;
      }
      this.facade.payQrSpiUserKey(
        mapTransferPayload({
          ...this.form.value,
          transferType: TransferType.SEND_BRE_B,
          breBTransfer: true,
          addenda: {
            note: null,
            referenceId: null
          }
        }),
        this.alertStepData()
      );
    }
  }

  protected cancelQR(): void {
    if (this.form.valid) {
      this.facade.cancelQR(
        mapQrCancelPayload(this.form.value),
        this.alertStepData()
      );
    }
  }

  get isForPay(): boolean {
    return this.facade.qrPayType$.currentValue() === TrxPurpose.pay;
  }
}
