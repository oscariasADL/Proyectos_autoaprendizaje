import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertComponentType,
  AlertSheetIcon,
  AlertSheetProperties
} from '@commons/entities/alert/alert-sheet.entities';
import { mapError } from '@commons/helpers/http.helpers';

export function mapVerifyPasswordError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    id: 'login-error-alert',
    icon: AlertSheetIcon.error,
    title: 'Error',
    description: mapError(error),
    buttons: ['Intentar de nuevo'],
    componentType: AlertComponentType.alertCenter
  };
}
