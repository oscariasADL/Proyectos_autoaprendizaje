import {
  QrCancelPayload,
  QrPayAccountPayload,
  QrPayPayload
} from '@modules/qr/pages/qr-pay/entities/qr-pay.interface';
import { DeviceData } from '@commons/entities/device/device.interface';
import {
  QrData,
  QRType
} from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import {
  DataBasicClientDto,
  UserData
} from '@commons/entities/auth/auth.entities';
import { SearchBusinessesPayload } from '@modules/qr/pages/qr-pay/entities/qr-pay.interface';
import {
  isNullOrUndefined,
  sanitizeCurrency
} from '@commons/helpers/text.helpers';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';

export function mapQrPayPayload(values: any): QrPayPayload {
  const qrMetadata: string = values.qrMetadata;
  const { id: relativeId } = values.fromProduct;
  const amount = values?.amount;

  return {
    qrMetadata,
    paymentMethod: { relativeId },
    numberOfInstalments: values.installments,
    ...(!isNullOrUndefined(amount)
      ? { amount: sanitizeCurrency(values.amount) }
      : {})
  };
}

export function mapQrPayAccountPayload(values: any): QrPayAccountPayload {
  const qrMetadata: string = values.qrMetadata;
  const qrType = values.qrType as QRType;
  const amountStatic = sanitizeCurrency(values.amount);
  const { totalTrxAmount: amountDynamic } = values.data as QrData;
  const amount =
    qrType === QRType.dynamic ? amountDynamic : amountStatic.toString();
  const { numberProduct: accountId, type: accountType } = values.fromProduct;
  const { model: deviceModel, deviceSerial: serial } =
    values.deviceInfo as DeviceData;
  const { dataBasicClientDto: userData } = values.userData as UserData;

  return {
    qrMetadata,
    paymentMethod: {
      accountId,
      accountType
    },
    deviceAdmin: {
      deviceModel,
      serial
    },
    amount,
    ipAddress: userData?.ip,
    typeDoc: userData?.documentType,
    numDoc: userData?.documentNumber,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData?.email,
    phone: userData?.phoneNumber
  };
}

export function mapTargetAccountFromSpiUserKey(spiUserKey: TransferSpiUserKey) {
  return {
    key: spiUserKey.key
  };
}

export function mapQrCancelPayload(values: any): QrCancelPayload {
  const qrMetadata: string = values.qrMetadata;

  return { qrMetadata };
}

export function mapSearchBusinessPayload(
  qrScan: string,
  userData: DataBasicClientDto
): SearchBusinessesPayload {
  return {
    qrMetadata: qrScan,
    ipAddress: userData?.ip,
    typeDoc: userData?.documentType,
    numDoc: userData?.documentNumber
  };
}
