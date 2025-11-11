import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';
import { RechargePayload } from '@modules/product-options/recharges/entities/recharges.interface';
import { IdentificationFavoriteType } from '@modules/favorites/entities/favorites.interface';

export function mapRechargesResponse(
  payload: RechargePayload,
  response: GenericResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'recharges-success-alert',
    title: '¡Tu recarga fue exitosa!',
    description: 'No. de autorización',
    reference: response.approvalId,
    items,
    allowShare: true,
    favoritesData: {
      type: IdentificationFavoriteType.RECHARGE,
      data: payload
    }
  };
}

export function mapRechargesError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'recharges-error-alert',
    title: 'La recarga a celular no fue realizada',
    description: mapError(error)
  };
}
