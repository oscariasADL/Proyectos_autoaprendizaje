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

export function mapPocketPayResponse(
  response: SuccessResponse
): ToastProperties {
  return {
    type: ToastType.success,
    title: 'POCKETS.PAY.SUCCESS'
  };
}

export function mapPocketPayError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    icon: 'illustrations/error-browser-phone.svg',
    id: 'pocket-pay-error-alert',
    title: 'POCKETS.PAY.ERROR',
    description: mapError(error)
  };
}
