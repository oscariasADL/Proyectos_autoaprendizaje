import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';

export function mapPayTaxResponse(
  { approvalId }: SuccessResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'pay-tax-success-alert',
    title: 'El pago fue realizado con éxito',
    description: 'No. autorización',
    reference: approvalId,
    items,
    allowShare: true
  };
}

export function mapPayTaxError(error: HttpErrorResponse): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'pay-tax-error-alert',
    title: 'No fue posible Pagar',
    description: mapError(error)
  };
}
