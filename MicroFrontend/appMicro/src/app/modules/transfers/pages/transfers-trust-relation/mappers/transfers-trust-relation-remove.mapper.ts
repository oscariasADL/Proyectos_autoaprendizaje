import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import {
  ToastProperties,
  ToastType
} from '@commons/entities/toast/toast.entities';
import { mapError } from '@commons/helpers/http.helpers';

export function mapTransfersTrustRelationRemoveToast(): ToastProperties {
  return {
    type: ToastType.success,
    title: 'La relación de confianza fue eliminada'
  };
}

export function mapTransfersTrustRelationRemoveError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'trust-relation-remove-error-alert',
    title: 'No fue posible eliminar la relación de confianza',
    description: mapError(error)
  };
}
