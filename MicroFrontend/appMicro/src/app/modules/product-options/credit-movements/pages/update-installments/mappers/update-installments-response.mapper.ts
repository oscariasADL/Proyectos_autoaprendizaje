import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { mapError } from '@commons/helpers/http.helpers';
import {
  ToastProperties,
  ToastType
} from '@commons/entities/toast/toast.entities';

export function mapUpdateInstallmentsResponse(): ToastProperties {
  return {
    type: ToastType.success,
    title: 'UPDATE_INSTALLMENTS.RESPONSE.SUCCESS.TITLE'
  };
}

export function mapUpdateInstallmentsError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'update-installments-error-alert',
    title: 'UPDATE_INSTALLMENTS.RESPONSE.ERROR.TITLE',
    description: mapError(error)
  };
}
