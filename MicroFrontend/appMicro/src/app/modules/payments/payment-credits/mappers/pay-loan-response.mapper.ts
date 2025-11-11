import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';

export function mapPayLoanResponse(
  response: SuccessResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'pay-loan-success-alert',
    title: 'PAYMENTS.PAY_LOAN.RESPONSE.SUCCESS',
    description: 'PAYMENTS.PAY_LOAN.RESPONSE.AUTHORIZATION',
    reference: response.approvalId,
    items,
    allowShare: true
  };
}

export function mapPayLoanError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'pay-loan-error-alert',
    title: 'PAYMENTS.PAY_LOAN.RESPONSE.ERROR',
    description: mapError(error)
  };
}
