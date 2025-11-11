import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import {
  QrData,
  QRType
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
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { createAction, props } from '@ngrx/store';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';
import { TransferPayload } from '@modules/transfers/entities/transfers.interface';

export const payQRAction = createAction(
  type('[Global/API] Pay QR'),
  props<{ payload: QrPayPayload; data: AlertStepData }>()
);

export const payQRAccountAction = createAction(
  type('[QR_PAY] Pay QR Account'),
  props<{ payload: QrPayAccountPayload; data: AlertStepData }>()
);

export const payQRSpiUserKeyAction = createAction(
  type('[QR_PAY] Pay QR SPi User Key'),
  props<{ payload: TransferPayload; data: AlertStepData }>()
);

export const payQRSuccessAction = createAction(
  type('[Global/API] Pay QR success'),
  props<{ props: AlertSheetProperties }>()
);

export const payQRErrorAction = createAction(
  type('[Global/API] Pay QR error'),
  props<{ props: AlertSheetProperties }>()
);

export const cancelQRAction = createAction(
  type('[Global/API] Cancel QR'),
  props<{ payload: QrCancelPayload; data: AlertStepData }>()
);

export const cancelQRSuccessAction = createAction(
  type('[Global/API] Cancel QR success'),
  props<{ props: AlertSheetProperties }>()
);

export const cancelQRErrorAction = createAction(
  type('[Global/API] Cancel QR error'),
  props<{ props: AlertSheetProperties }>()
);

export const resetQRPayAction = createAction(type('[Global/UI] Reset QR pay'));

export const setQRScanAction = createAction(
  type('[Global/UI] Set QR scan'),
  props<{ qrScan: string }>()
);

export const setQRDataAction = createAction(
  type('[Global/UI] Set QR data'),
  props<{ qrData: QrData }>()
);

export const setQRPaymentMethodsAction = createAction(
  type('[Global/UI] Set QR payment methods'),
  props<{ qrPaymentMethods: QrPaymentMethod }>()
);

export const setQRPaymentMethodDataAction = createAction(
  type('[Global/UI] Set QR payment method data'),
  props<{ qrPaymentMethodData: QrPaymentMethodData }>()
);

export const setQrTypeAction = createAction(
  type('[QR_PAY] set qrType'),
  props<{ qrType: QRType }>()
);

export const setIsItBetweenAccountsAction = createAction(
  type('[QR_PAY] Set its between accounts'),
  props<{ isItBetweenAccounts: boolean }>()
);

export const setSpiUserKeyAction = createAction(
  type('[QR_PAY] Set SPi user key'),
  props<{ spiUserKey: TransferSpiUserKey }>()
);
