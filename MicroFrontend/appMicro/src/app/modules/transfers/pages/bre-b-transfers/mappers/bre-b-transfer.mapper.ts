import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';
import {
  AddSpiContactPayload,
  TowardAccount
} from '@modules/transfers/pages/bre-b-transfers/entities/bre-b-transfers.interface';
import {
  ToastProperties,
  ToastType
} from '@commons/entities/toast/toast.entities';

export function mapTargetAccountFromSpiUserKey(
  spiUserKey: TransferSpiUserKey
): TowardAccount {
  return {
    bankName: spiUserKey.bankName,
    key: spiUserKey.key,
    fullName: spiUserKey.fullName,
    name: spiUserKey.name
  };
}

export function mapAddSpiContactPayload(
  spiKeyData: TowardAccount
): AddSpiContactPayload {
  return {
    contactKey: spiKeyData.key,
    customName: spiKeyData.fullName,
    fullName: spiKeyData.fullName,
    obfuscatedFullName: spiKeyData.name,
    nameBank: spiKeyData.bankName,
    isFav: false
  };
}

export function mapUpdateSpiContactSuccessToast(
  title: string
): ToastProperties {
  return {
    type: ToastType.success,
    title,
    override: {
      timeOut: 5000
    }
  };
}

export function mapUpdateSpiContactErrorToast(): ToastProperties {
  return {
    type: ToastType.error,
    title: 'Error'
  };
}
