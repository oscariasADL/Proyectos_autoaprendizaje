import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { mapError } from '@commons/helpers/http.helpers';

export function mapUpdatePasswordError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'update-password-error-alert',
    title: 'CHANGE_PASSWORD.ERROR.TITLE',
    description: mapError(error)
  };
}
