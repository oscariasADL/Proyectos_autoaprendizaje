import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';

export function mapUseQuotaResponse(
  response: SuccessResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'use-quota-success-alert',
    title: '¡El cupo fue usado con exíto!',
    description: 'No. de autorización',
    reference: response.approvalId,
    items
  };
}

export function mapUseQuotaError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'use-quota-error-alert',
    title: 'No fue posible hacer uso del cupo rotativo',
    description: mapError(error)
  };
}
