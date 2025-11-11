import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import {
  ToastProperties,
  ToastType
} from '@commons/entities/toast/toast.entities';
import { mapError } from '@commons/helpers/http.helpers';

export function mapPocketTransferResponse(
  response: SuccessResponse
): ToastProperties {
  return {
    type: ToastType.success,
    title: 'POCKETS.TRANSFER.SUCCESS'
  };
}

export function mapPocketTransferError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    icon: 'illustrations/error-browser-phone.svg',
    id: 'pocket-transfer-error-alert',
    title: 'POCKETS.TRANSFER.ERROR',
    description: mapError(error)
  };
}
