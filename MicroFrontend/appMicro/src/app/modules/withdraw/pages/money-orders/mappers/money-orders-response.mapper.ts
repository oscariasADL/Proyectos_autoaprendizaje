import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';
import { WithdrawPayload } from '@modules/withdraw/entities/withdraw.interface';
import { IdentificationFavoriteType } from '@modules/favorites/entities/favorites.interface';

export function mapMoneyOrdersResponse(
  payload: WithdrawPayload,
  response: GenericResponse,
  voucherItems: VoucherItem[]
): AlertSheetProperties {
  const items: VoucherItem[] = [...voucherItems];
  items.splice(5, 0, {
    id: 'approval-id',
    label: 'WITHDRAW.MONEY_ORDERS.SUCCESS.LABEL',
    fields: [response.approvalId]
  });

  return {
    type: AlertSheetType.success,
    id: 'money-orders-success-alert',
    title: 'WITHDRAW.MONEY_ORDERS.SUCCESS.TITLE',
    description: 'WITHDRAW.MONEY_ORDERS.SUCCESS.DESCRIPTION',
    reference: response.otp,
    items,
    message: 'WITHDRAW.MONEY_ORDERS.SUCCESS.MESSAGE',
    allowShare: true,
    favoritesData: {
      type: IdentificationFavoriteType.MONEY_ORDER,
      data: payload
    }
  };
}

export function mapMoneyOrdersError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'money-orders-error-alert',
    title: 'WITHDRAW.MONEY_ORDERS.ERROR.TITLE',
    description: mapError(error)
  };
}
