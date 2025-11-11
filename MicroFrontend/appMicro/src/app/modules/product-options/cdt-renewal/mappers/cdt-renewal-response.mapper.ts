import { HttpErrorResponse } from '@angular/common/http';
import { VoucherItemType } from '@commons/components/voucher/entities/voucher.entities';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { mapError } from '@commons/helpers/http.helpers';
import { sanitizeDate } from '@commons/helpers/text.helpers';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';

export function mapRenewalCdtResponse(
  response: SuccessResponse,
  cdt: ProductDetail
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'cdt-renewal-success-alert',
    title: 'Activaste la renovación automática de tu CDT Digital',
    description: 'No. de aprobación',
    reference: response.approvalId,
    items: [
      {
        id: 'state',
        label: 'Estado renovación',
        fields: ['Activa'],
        type: VoucherItemType.Main
      },
      {
        id: 'since',
        label: 'Renovación a partir de',
        fields: [sanitizeDate(cdt.expirationDate)]
      },
      {
        id: 'details',
        fields: [
          'Tu CDT se reinvertirá automaticamente, los rendimientos se abonarán a tu Cuenta de Ahorros. ' +
            'En caso de no tener una cuenta podrás retirar la plata en nuestras oficinas.',
          'Se renovará bajo las mismas condiciones de monto y plazo que tienes en la actualidad.',
          'Aplicará la tasa de política de renovación vigente, a la fecha de renovación.'
        ],
        type: VoucherItemType.List
      }
    ]
  };
}

export function mapRenewalCdtError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'cdt-renewal-error-alert',
    title: 'No fue posible activar la renovación automática de tu CDT Digital',
    description: mapError(error)
  };
}
