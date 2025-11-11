import { ActivationProduct } from '@modules/security/security-media-activation/entities/security-media.interface';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { mapError } from '@commons/helpers/http.helpers';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';

export function mapProductMedias(
  medias: ActivationProduct[],
  selectedProduct: any
) {
  return medias.filter((media) => media?.parentId === selectedProduct?.id);
}

export function mapSendBlockAccountResponse(
  response: SuccessResponse,
  selectedProduct: ProductDetail
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'block-account-success-alert',
    title: 'El bloqueo de la cuenta fue exitoso',
    description: 'No. de aprobación',
    reference: response.approvalId,
    denyDownload: true,
    buttons: ['Entendido'],
    items: [
      {
        id: 'account',
        label:
          selectedProduct.productType === 'SDA'
            ? 'Cuenta de ahorros'
            : 'Cuenta corriente',
        fields: [selectedProduct.numberProduct]
      },
      {
        id: 'date',
        label: 'Fecha de bloqueo',
        fields: [new Date(response.transactionDate).toLocaleDateString('en-GB')]
      }
    ]
  };
}

export function mapSendBlockAccountError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'block-account-error-alert',
    title: 'No fue posible bloquear tu cuenta',
    description: mapError(error)
  };
}
