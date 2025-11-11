import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';

export function mapCardAdvanceResponse(
  response: SuccessResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'card-advance-success-alert',
    title: '¡El avance fue realizado con éxito!',
    description: 'No. de autorización',
    reference: response.approvalId,
    items
  };
}

export function mapCardAdvanceError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'card-advance-error-alert',
    title: 'El avance de tarjeta no fue realizado',
    description: mapError(error)
  };
}
