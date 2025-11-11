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

export function mapPocketEditResponse(
  response: SuccessResponse
): ToastProperties {
  return {
    type: ToastType.success,
    title: 'POCKETS.EDIT.SUCCESS'
  };
}

export function mapPocketEditError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'pocket-edit-error-alert',
    title: 'POCKETS.EDIT.ERROR',
    description: mapError(error)
  };
}
