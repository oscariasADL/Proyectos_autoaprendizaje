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

export function mapPocketDeleteResponse(
  response: SuccessResponse
): ToastProperties {
  return {
    type: ToastType.success,
    title: 'POCKETS.DELETE.SUCCESS'
  };
}

export function mapPocketDeleteError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    icon: 'illustrations/error-browser-phone.svg',
    id: 'pocket-delete-error-alert',
    title: 'POCKETS.DELETE.ERROR',
    description: mapError(error)
  };
}
