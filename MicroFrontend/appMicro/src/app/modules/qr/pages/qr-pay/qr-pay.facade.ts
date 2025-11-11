import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import {
  QrData,
  QRType,
  TrxPurpose
} from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import {
  QrCancelPayload,
  QrPayAccountPayload,
  QrPayPayload
} from '@modules/qr/pages/qr-pay/entities/qr-pay.interface';
import {
  QrPaymentMethod,
  QrPaymentMethodData
} from '@modules/qr/pages/qr-pay/entities/qr-payment-method.interface';
import * as actions from '@modules/qr/pages/qr-pay/store/qr-pay.actions';
import {
  qrIsItBetweenAccountsSelector,
  qrPayDataSelector,
  qrPaymentMethodDataSelector,
  qrPaymentMethodsSelector,
  qrPayTypeSelector,
  qrScanSelector,
  qrSpiUserKeySelector,
  qrTypeSelector
} from '@modules/qr/pages/qr-pay/store/qr-pay.selector';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';
import { TransferPayload } from '@modules/transfers/entities/transfers.interface';

@Injectable()
export class QrPayFacade extends AppFacade {
  public qrScan$: Observable<string> = this.store.pipe(select(qrScanSelector));

  public qrPayData$: Observable<QrData> = this.store.pipe(
    select(qrPayDataSelector)
  );

  public qrPayType$: Observable<TrxPurpose> = this.store.pipe(
    select(qrPayTypeSelector)
  );

  public qrPaymentMethods$: Observable<QrPaymentMethod> = this.store.pipe(
    select(qrPaymentMethodsSelector)
  );

  public qrType$: Observable<QRType> = this.store.pipe(select(qrTypeSelector));

  public isItBetweenAccounts$: Observable<boolean> = this.store.pipe(
    select(qrIsItBetweenAccountsSelector)
  );

  public spiUserKey$: Observable<TransferSpiUserKey> = this.store.pipe(
    select(qrSpiUserKeySelector)
  );

  public qrPaymentMethodData$: Observable<QrPaymentMethodData> =
    this.store.pipe(select(qrPaymentMethodDataSelector));

  public payQR(payload: QrPayPayload, data: AlertStepData): void {
    this.store.dispatch(actions.payQRAction({ payload, data }));
  }

  public payQrAccount(payload: QrPayAccountPayload, data: AlertStepData): void {
    this.store.dispatch(actions.payQRAccountAction({ payload, data }));
  }

  public payQrSpiUserKey(payload: TransferPayload, data: AlertStepData): void {
    this.store.dispatch(actions.payQRSpiUserKeyAction({ payload, data }));
  }

  public cancelQR(payload: QrCancelPayload, data: AlertStepData): void {
    this.store.dispatch(actions.cancelQRAction({ payload, data }));
  }

  public resetQRPay(): void {
    this.store.dispatch(actions.resetQRPayAction());
  }

  public setQRScan(qrScan: string): void {
    this.store.dispatch(actions.setQRScanAction({ qrScan }));
  }

  public setQRData(qrData: QrData): void {
    this.store.dispatch(actions.setQRDataAction({ qrData }));
  }

  public setQRPaymentMethods(qrPaymentMethods: QrPaymentMethod): void {
    this.store.dispatch(
      actions.setQRPaymentMethodsAction({ qrPaymentMethods })
    );
  }

  public setQRPaymentMethodData(
    qrPaymentMethodData: QrPaymentMethodData
  ): void {
    this.store.dispatch(
      actions.setQRPaymentMethodDataAction({ qrPaymentMethodData })
    );
  }

  public setQrType(qrType: QRType): void {
    this.store.dispatch(actions.setQrTypeAction({ qrType }));
  }

  public setIsItBetweenAccounts(isItBetweenAccounts: boolean) {
    this.store.dispatch(
      actions.setIsItBetweenAccountsAction({ isItBetweenAccounts })
    );
  }

  public setSpiUserKey(spiUserKey: TransferSpiUserKey): void {
    this.store.dispatch(actions.setSpiUserKeyAction({ spiUserKey }));
  }
}
