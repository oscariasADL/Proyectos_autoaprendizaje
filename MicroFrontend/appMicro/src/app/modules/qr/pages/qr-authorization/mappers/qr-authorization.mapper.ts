import { format } from 'date-fns';

import {
  CUSTOM_FACTS_LABELS,
  CUSTOM_FACTS_SORTED_KEYS
} from '@modules/qr/pages/qr-authorization/constants/qr-authorization.constants';
import { CustomFactKeys } from '@modules/qr/pages/qr-authorization/entities/qr-authorization.interface';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { DATE_FORMAT_1 } from '@commons/constants/date-format.constants';
import {
  ToastProperties,
  ToastType
} from '@app/commons/entities/toast/toast.entities';

export function mapDecryptedData(data: Record<string, string>): string[] {
  return CUSTOM_FACTS_SORTED_KEYS.filter((key) => data[key]).map((key) => {
    switch (key) {
      case CustomFactKeys.AMOUNT:
        const currencyFormat = new CurrencyFormatPipe('en-US');
        return `${CUSTOM_FACTS_LABELS[key]}: <b>${currencyFormat.transform(
          data[key]
        )}</b>`;
      case CustomFactKeys.DATE:
        return `${CUSTOM_FACTS_LABELS[key]}: <b>${format(
          new Date(data[key]),
          DATE_FORMAT_1
        )}</b>`;
      default:
        return `${CUSTOM_FACTS_LABELS[key]}: <b>${data[key]}</b>`;
    }
  });
}
export function mapQRServiceResponse(): ToastProperties {
  return {
    type: ToastType.success,
    title: 'QR.OPTIONS.AUTHORIZATION.TOAST_SUCCESS'
  };
}
export function mapQRServiceReject(): ToastProperties {
  return {
    type: ToastType.error,
    title: 'QR.OPTIONS.AUTHORIZATION.TOAST_FAILED'
  };
}
