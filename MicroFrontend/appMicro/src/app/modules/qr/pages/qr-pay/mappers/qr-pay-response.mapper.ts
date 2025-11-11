import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';

export function mapQrPayResponse(
  response: SuccessResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'qr-pay-success-alert',
    title: 'Tu pago se realizó con éxito',
    description: 'No. de autorización',
    reference: response.approvalId,
    items,
    allowShare: true
  };
}

export function mapQrPayError(error: HttpErrorResponse): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'use-quota-error-alert',
    title: 'No fue posible pagar',
    description: mapError(error)
  };
}

export function mapQrCancelResponse(
  response: SuccessResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'qr-cancel-success-alert',
    title: 'Tu compra fue anulada con éxito',
    description: 'No. de autorización',
    reference: response.approvalId,
    items,
    allowShare: true
  };
}

export function mapQrCancelError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'use-quota-error-alert',
    title: 'No fue posible anular tu compra',
    description: mapError(error)
  };
}
