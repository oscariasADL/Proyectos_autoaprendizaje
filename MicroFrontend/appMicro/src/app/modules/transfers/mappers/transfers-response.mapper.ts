import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';
import { TransferPayload, TransferType } from '../entities/transfers.interface';
import { IdentificationFavoriteType } from '@modules/favorites/entities/favorites.interface';
import { UTAG_TRANSFERS_DATA } from '@modules/transfers/constants/transfers.constants';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { BANK_GROUP } from '@commons/constants/card.constants';

export function mapTransfersResponse(
  payload: TransferPayload,
  response: GenericResponse,
  items: VoucherItem[],
  transferType: TransferType
): AlertSheetProperties {
  const utagTransferData = UTAG_TRANSFERS_DATA[transferType];
  return {
    type: AlertSheetType.success,
    id: 'transfer-success-alert',
    title: mapTransferTitle(transferType),
    description: 'TRANSFERS.RESPONSE.SUCCESS.DESCRIPTION',
    reference: response.approvalId,
    items,
    message: mapTransfersResponseMessage(transferType, payload),
    allowShare: true,
    favoritesData: ![
      TransferType.REQUEST_TRANSFIYA,
      TransferType.MY_CONTACTS,
      TransferType.MY_ACCOUNTS_AVV,
      TransferType.SEND_AVAL_KEY,
      TransferType.SEND_BRE_B
    ].includes(transferType)
      ? {
          type: IdentificationFavoriteType.TRANSFER,
          data: payload
        }
      : null,
    ...(!isNullOrUndefined(utagTransferData) ? { ...utagTransferData } : {}),
    bottomImage:
      transferType === TransferType.SEND_TRANSFIYA
        ? 'icons/transfiya.svg'
        : null,
    shouldSaveSpiContact: payload?.shouldSaveSpiContact,
    isFavoriteSpiContact: payload?.isFavoriteSpiContact,
    isSavedSpiContact: payload?.isSavedSpiContact,
    spiContactKey: payload?.towardAvalKey
  };
}

export function mapTransfersError(
  error: HttpErrorResponse,
  transferType: TransferType
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'transfer-error-alert',
    title:
      transferType === TransferType.REQUEST_TRANSFIYA
        ? 'TRANSFERS.RESPONSE.ERROR.TITLE_REQUEST_TRANSFIYA'
        : 'TRANSFERS.RESPONSE.ERROR.TITLE',
    description: mapError(error)
  };
}

function mapTransferTitle(transferType: TransferType): string {
  const titles = {
    [TransferType.SEND_TRANSFIYA]:
      'TRANSFERS.RESPONSE.SUCCESS.TITLE_SEND_TRANSFIYA',
    [TransferType.REQUEST_TRANSFIYA]:
      'TRANSFERS.RESPONSE.SUCCESS.TITLE_REQUEST_TRANSFIYA',
    [TransferType.REQUEST_CEL2CEL]:
      'TRANSFERS.CEL2CEL.REQUEST.RESPONSE_TITLE_REQUEST'
  };
  return titles[transferType] ?? 'TRANSFERS.RESPONSE.SUCCESS.TITLE';
}

function mapTransfersResponseMessage(
  transferType: TransferType,
  payload: TransferPayload
): string {
  switch (transferType) {
    case TransferType.SEND_TRANSFIYA:
      return 'TRANSFERS.RESPONSE.SUCCESS.MESSAGE_SEND_TRANSFIYA';
    case TransferType.REQUEST_TRANSFIYA:
      return 'TRANSFERS.RESPONSE.SUCCESS.MESSAGE_REQUEST_TRANSFIYA';
    case TransferType.MY_CONTACTS:
      return payload?.contactInfo?.accountInfo?.bank !== BANK_GROUP.VILLAS_CODE
        ? 'TRANSFERS.RESPONSE.SUCCESS.MESSAGE_CONTACT'
        : '';
    case TransferType.SEND_AVV_PHONE:
      return 'TRANSFERS.RESPONSE.SUCCESS.MESSAGE_SEND_AVV_PHONE';
    case TransferType.REQUEST_CEL2CEL:
      return 'TRANSFERS.CEL2CEL.ALERT_SHEET.REQUEST_MESSAGE';
    case TransferType.SEND_CEL2CEL:
      return 'TRANSFERS.CEL2CEL.ALERT_SHEET.SEND_MESSAGE';
    default:
      return null;
  }
}
