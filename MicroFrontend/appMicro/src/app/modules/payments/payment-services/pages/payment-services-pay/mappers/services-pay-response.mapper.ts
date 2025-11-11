import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';
import { PayBillPayload } from '@modules/payments/payment-services/entities/payment-services.interface';
import { IdentificationFavoriteType } from '@modules/favorites/entities/favorites.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

export function mapServicesPayResponse(
  payload: PayBillPayload,
  response: SuccessResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'services-pay-success-alert',
    title: 'PAYMENTS.SERVICES.RESPONSE.SUCCESS.TITLE',
    description: 'PAYMENTS.SERVICES.RESPONSE.SUCCESS.AUTHORIZATION',
    reference: response.approvalId,
    items,
    allowShare: true,
    ...(!isNullOrUndefined(payload?.agreementType) &&
    !isNullOrUndefined(payload?.organizationName)
      ? {
          favoritesData: {
            type: IdentificationFavoriteType.PAYMENT,
            data: payload
          }
        }
      : {})
  };
}

export function mapServicesPayError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'services-pay-error-alert',
    title: 'PAYMENTS.SERVICES.RESPONSE.ERROR.TITLE',
    description: mapError(error)
  };
}
