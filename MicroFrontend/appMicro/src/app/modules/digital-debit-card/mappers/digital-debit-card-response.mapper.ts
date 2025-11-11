import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertComponentType,
  AlertSheetIcon,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { mapError } from '@commons/helpers/http.helpers';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { DigitalDebitCardType } from '@modules/digital-debit-card/entities/digital-debit-card.interface';

const titleActionError = {
  [DigitalDebitCardType.NEW]: 'DIGITAL_DEBIT_CARD.RESPONSE.ERROR_CREATE.TITLE',
  [DigitalDebitCardType.CANCELLATION]:
    'DIGITAL_DEBIT_CARD.RESPONSE.ERROR_CANCEL.TITLE',
  [DigitalDebitCardType.REISSUE]:
    'DIGITAL_DEBIT_CARD.RESPONSE.ERROR_REISSUE.TITLE'
};

export function mapCreateDigitalDebitCardError(
  error: HttpErrorResponse,
  digitalDebitCardTypeAction: DigitalDebitCardType
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'digital-debit-card-error-alert',
    title:
      titleActionError[digitalDebitCardTypeAction] ||
      'DIGITAL_DEBIT_CARD.RESPONSE.ERROR_CREATE.TITLE',
    description: mapError(error)
  };
}

export function mapEditDigitalDebitCardError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'digital-debit-card-edit-error-alert',
    title: 'DIGITAL_DEBIT_CARD.RESPONSE.ERROR_EDIT.TITLE',
    description: mapError(error)
  };
}

export function mapDigitalDebitCardDetailError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'digital-debit-card-detail-error-alert',
    title: 'DIGITAL_DEBIT_CARD.RESPONSE.ERROR_DETAIL.TITLE',
    description: mapError(error)
  };
}

export function mapCancelDigitalDebitCardSuccess(
  response: GenericResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'digital-debit-card-cancel-success-alert',
    title: 'DIGITAL_DEBIT_CARD.CANCEL.CANCEL_SUCCESS',
    description: 'DIGITAL_DEBIT_CARD.CANCEL.APPROVAL',
    componentType: AlertComponentType.alertSheet,
    icon: AlertSheetIcon.success,
    denyDownload: true,
    reference: response.approvalId,
    dateReference: response.transactionDate,
    buttons: ['ACTIONS.COPY_THAT']
  };
}
