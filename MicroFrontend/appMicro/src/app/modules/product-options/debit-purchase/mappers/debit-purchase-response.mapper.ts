import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';

export function mapDebitPurchaseResponse(
  response: SuccessResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'debit-purchase-success-alert',
    title: '¡Tu compra de cartera fue realizada con éxito!',
    description: 'No. de autorización',
    reference: response.approvalId,
    items
  };
}

export function mapDebitPurchaseError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'debit-purchase-error-alert',
    title: 'No fue posible realizar tu compra de cartera',
    description: mapError(error)
  };
}
