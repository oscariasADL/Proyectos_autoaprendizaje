import {
  QrData,
  QRType
} from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import {
  QrPaymentMethod,
  QrPaymentMethodData
} from '@modules/qr/pages/qr-pay/entities/qr-payment-method.interface';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';

export const qrPayFeatureName = 'qrPayModuleState';

export type QrPayState = Readonly<{
  qrScan: string;
  qrData: QrData;
  qrType: QRType;
  isItBetweenAccounts: boolean;
  spiUserKey: TransferSpiUserKey;
  qrPaymentMethods: QrPaymentMethod;
  qrPaymentMethodData: QrPaymentMethodData;
}>;

export const initialQrPayState: QrPayState = {
  qrScan: '',
  qrData: null,
  qrType: null,
  isItBetweenAccounts: false,
  spiUserKey: null,
  qrPaymentMethods: null,
  qrPaymentMethodData: null
};
