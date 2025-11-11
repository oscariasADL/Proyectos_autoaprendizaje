import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';

export function mapCashWithdrawalsResponse(
  response: GenericResponse,
  voucherItems: VoucherItem[]
): AlertSheetProperties {
  const items: VoucherItem[] = [...voucherItems];
  items.splice(5, 0, {
    id: 'approval-id',
    label: 'WITHDRAW.WITHOUT_CARD.SUCCESS.LABEL',
    fields: [response.approvalId]
  });

  return {
    type: AlertSheetType.success,
    id: 'cash-withdrawals-success-alert',
    title: 'WITHDRAW.WITHOUT_CARD.SUCCESS.TITLE',
    description: 'WITHDRAW.WITHOUT_CARD.SUCCESS.DESCRIPTION',
    reference: response.otp,
    bottomMessage: 'WITHDRAW.WITHOUT_CARD.SUCCESS.MESSAGE',
    items
  };
}

export function mapCashWithdrawalsError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'cash-withdrawals-error-alert',
    title: 'WITHDRAW.WITHOUT_CARD.ERROR.TITLE',
    description: mapError(error)
  };
}
