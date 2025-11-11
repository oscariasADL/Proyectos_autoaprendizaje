import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';

export function mapContactAddProductResponse(
  response: GenericResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'contact-add-product-success-alert',
    title: 'El contacto se agrego exitosamente',
    description: 'No. de autorización',
    reference: response.approvalId
  };
}

export function mapContactAddProductError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'contact-add-product-error-alert',
    title: '¡No se pudo agregar el producto de tu contacto!',
    description: mapError(error)
  };
}
