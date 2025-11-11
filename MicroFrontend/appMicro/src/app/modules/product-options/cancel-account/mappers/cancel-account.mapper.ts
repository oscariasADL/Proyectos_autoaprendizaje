import { SuccessResponse } from '@commons/entities/response/response.interface';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { HttpErrorResponse } from '@angular/common/http';
import { mapError } from '@commons/helpers/http.helpers';
import { CancelAccountPayload } from '@modules/product-options/cancel-account/entities/cancel-account.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { format, parseISO } from 'date-fns';
import { DATE_FORMAT_1 } from '@commons/constants/date-format.constants';

export function mapCancelAccountResponse(
  response: SuccessResponse,
  cancelAccountPayload: CancelAccountPayload
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'cancel-account-success-alert',
    title: 'La cancelación fue exitosa',
    description: 'No. de autorización',
    reference: response.approvalId,
    items: [
      {
        id: 'title',
        label: 'Productos cancelados',
        fields: ['']
      },
      {
        id: 'saving-account',
        label: 'Cuenta de ahorros',
        fields: [`No.${cancelAccountPayload.numberProduct}`]
      },
      ...(!isNullOrUndefined(cancelAccountPayload?.numberDigitalCard)
        ? [
            {
              id: 'digital-debit-card',
              label: 'Tarjeta Master Débito Digital',
              fields: [`No.${cancelAccountPayload?.numberDigitalCard}`]
            }
          ]
        : []),
      {
        id: 'date',
        label: 'Fecha',
        fields: [format(parseISO(response.transactionDate), DATE_FORMAT_1)]
      }
    ]
  };
}

export function mapCancelAccountError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'cancel-account-error-alert',
    title: 'No fue posible hacer la cancelación',
    description: mapError(error)
  };
}
