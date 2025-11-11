import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';

export function mapSocialSecurityResponse(
  response: GenericResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'social-security-success-alert',
    title: 'El pago fue realizado con éxito',
    description: 'No. de autorización',
    reference: response.approvalId,
    items,
    allowShare: true
  };
}

export function mapSocialSecurityError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'social-security-error-alert',
    title: 'No fue posible pagar',
    description: mapError(error)
  };
}
