import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';

export function mapPocketCreateResponse(
  response: SuccessResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'pocket-create-success-alert',
    title: 'POCKETS.CREATE.SUCCESS',
    description: 'POCKETS.CREATE.AUTHORIZATION',
    reference: response.approvalId,
    denyDownload: true,
    items
  };
}

export function mapPocketCreateError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'pocket-create-error-alert',
    icon: 'illustrations/error-browser-phone.svg',
    title: 'POCKETS.CREATE.ERROR',
    description: mapError(error)
  };
}
