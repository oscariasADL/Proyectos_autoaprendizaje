import { TypeAccount } from '@commons/entities/product/type-account';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import {
  PRODUCT_ACTIONS,
  ProductAction,
  ProductActionType
} from '@modules/product/entities/product-action.interface';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';
import {
  AFC_ACTIONS,
  CCA_ACTIONS,
  DDA_ACTIONS,
  DLA_ACTIONS,
  LOC_ACTIONS,
  PRODUCTS_ALLOWED_TO_CANCEL,
  SDA_ACTIONS
} from '@modules/product/constants/product.constants';
import { Platform } from '@commons/constants/global.constants';

export function mapProductAction(
  product: ProductDetail,
  productTypeDetailKey: ProductTypeDetail,
  platform: string
): ProductAction[] {
  const hasCancelAccount =
    PRODUCTS_ALLOWED_TO_CANCEL.includes(productTypeDetailKey);

  const cancelAction = hasCancelAccount
    ? [PRODUCT_ACTIONS[ProductActionType.CancelAccount]]
    : [];

  if (platform === Platform.IOS.toString()) {
    [SDA_ACTIONS, DDA_ACTIONS].forEach(insertApplePayIfNecessary);
  }

  const actionMap = {
    [TypeAccount.SDA]: [...SDA_ACTIONS, ...cancelAction],
    [TypeAccount.DDA]: [...DDA_ACTIONS, ...cancelAction],
    [TypeAccount.AFC]: AFC_ACTIONS,
    [TypeAccount.CCA]: [
      PRODUCT_ACTIONS[ProductActionType.BlockCard],
      PRODUCT_ACTIONS[ProductActionType.ConfigCards],
      ...(product.availableAdvanceBalance > 0
        ? [PRODUCT_ACTIONS[ProductActionType.RealizeAdvance]]
        : []),
      ...CCA_ACTIONS
    ],
    [TypeAccount.LOC]: LOC_ACTIONS,
    [TypeAccount.DLA]: DLA_ACTIONS
  };

  return actionMap[product.type] || [];
}

const insertApplePayIfNecessary = (actions: ProductAction[]) => {
  if (actions.every((action) => action.type !== ProductActionType.ApplePay)) {
    actions.splice(2, 0, PRODUCT_ACTIONS[ProductActionType.ApplePay]);
  }
};
