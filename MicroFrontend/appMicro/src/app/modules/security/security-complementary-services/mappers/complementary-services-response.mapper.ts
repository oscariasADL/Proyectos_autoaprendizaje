import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { mapError } from '@commons/helpers/http.helpers';

export function mapComplementaryServicesError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'complementary-services-error-alert',
    title: 'No fue posible cambiar tus servicios complementarios',
    description: mapError(error)
  };
}
