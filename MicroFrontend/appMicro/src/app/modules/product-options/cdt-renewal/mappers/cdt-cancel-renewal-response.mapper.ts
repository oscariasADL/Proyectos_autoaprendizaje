import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItemType } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';

export function mapCancelRenewalCdtResponse(
  response: SuccessResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'cdt-cancel-renewal-success-alert',
    title: 'Cancelaste la renovación automática de tu CDT Digital',
    description: 'No. de aprobación',
    reference: response.approvalId,
    items: [
      {
        id: 'state',
        label: 'Estado renovación',
        fields: ['Cancelado'],
        type: VoucherItemType.Main
      },
      {
        id: 'details',
        fields: [
          'La inversión y los rendimientos ganados serán abonados a tu Cuenta de Ahorros. ' +
            'En caso de no tener una cuenta podrás retirar la plata en nuestras oficinas.'
        ],
        type: VoucherItemType.List
      }
    ]
  };
}

export function mapCancelRenewalCdtError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'cdt-cancel-renewal-error-alert',
    title: 'No fue posible cancelar la renovación automática de tu CDT Digital',
    description: mapError(error)
  };
}
