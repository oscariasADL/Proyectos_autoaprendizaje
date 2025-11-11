import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { mapError } from '@commons/helpers/http.helpers';
import {
  VirtualCreditCardActionType,
  VirtualCreditCardListPayload,
  VirtualCreditCardOperationPayload
} from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import {
  PRODUCT_ACTIONS,
  ProductAction,
  ProductActionType
} from '@modules/product/entities/product-action.interface';
import { GenericResponse } from '@commons/entities/response/response.interface';

const titleActionError = {
  [VirtualCreditCardActionType.NEW]:
    'VIRTUAL_CREDIT_CARD.RESPONSE.ERROR_CREATE.TITLE',
  [VirtualCreditCardActionType.CANCELLATION]:
    'VIRTUAL_CREDIT_CARD.RESPONSE.ERROR_CANCEL.TITLE',
  [VirtualCreditCardActionType.REISSUE]:
    'VIRTUAL_CREDIT_CARD.RESPONSE.ERROR_REISSUE.TITLE',
  [VirtualCreditCardActionType.EDIT]:
    'VIRTUAL_CREDIT_CARD.RESPONSE.ERROR_EDIT.TITLE'
};
const titleActionSuccess = {
  [VirtualCreditCardActionType.NEW]:
    'VIRTUAL_CREDIT_CARD.ACTIVATE.SUCCESS_CREATE.TITLE',
  [VirtualCreditCardActionType.CANCELLATION]:
    'VIRTUAL_CREDIT_CARD.CANCEL.CANCEL_SUCCESS',
  [VirtualCreditCardActionType.REISSUE]:
    'VIRTUAL_CREDIT_CARD.REISSUE.REISSUE_SUCCESS'
};

export function mapOperationVirtualCreditCardError(
  error: HttpErrorResponse,
  virtualCreditCardTypeAction: VirtualCreditCardActionType
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'virtual-credit-card-error-alert',
    title: titleActionError[virtualCreditCardTypeAction],
    description: mapError(error)
  };
}

export function mapOperationVirtualCreditCardSuccess(
  response: GenericResponse,
  virtualCreditCardTypeAction: VirtualCreditCardActionType
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'virtual-credit-card-success-alert',
    icon: 'icons/check.svg',
    title: titleActionSuccess[virtualCreditCardTypeAction],
    description: 'VIRTUAL_CREDIT_CARD.CANCEL.APPROVAL',
    reference: response.approvalId,
    allowShare: false,
    denyDownload: true,
    hideCloseButton: true,
    buttons: ['ACTIONS.COPY_THAT']
  };
}

export function mapFetchVirtualCreditCardPayload(
  productDetail: ProductDetail
): VirtualCreditCardListPayload {
  return {
    acctTypeParent: productDetail.type,
    numberProductParent: productDetail.numberProduct
  };
}

export function mapVirtualCreditCardActionsList(): ProductAction[] {
  return [
    PRODUCT_ACTIONS[ProductActionType.EditTCV],
    PRODUCT_ACTIONS[ProductActionType.CancelTCV],
    PRODUCT_ACTIONS[ProductActionType.ReissueTCV]
  ];
}

export function mapOperationVirtualCreditCardPayload(
  payload: VirtualCreditCardOperationPayload,
  letter: 'C' | 'F' | 'M'
): VirtualCreditCardOperationPayload {
  const newPayload = {};
  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      newPayload[key + letter] = payload[key];
    }
  }
  return newPayload as VirtualCreditCardOperationPayload;
}
