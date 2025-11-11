import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';

export function mapTransfiyaManagementResponse(
  response: GenericResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'allow-transfiya-success-alert',
    title: 'La transferencia fue realizada exitosamente',
    description: 'Refencia de pago',
    reference: response.approvalId,
    items,
    allowShare: true
  };
}

export function mapTransfiyaManagementError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'allow-transfiya-error-alert',
    title: 'No fue posible transferir',
    description: mapError(error)
  };
}
