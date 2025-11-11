import { TypeAccount } from '@commons/entities/product/type-account';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { ProductTypeDetail } from '@commons/entities/product/product-type-detail.interface';
import {
  PRODUCT_ACTIONS,
  ProductAction,
  ProductActionType
} from '../entities/product-action.interface';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';

export const PRODUCT_HAS_MOVEMENTS: TypeAccount[] = [
  TypeAccount.SDA,
  TypeAccount.DLA,
  TypeAccount.CH,
  TypeAccount.DDA,
  TypeAccount.AFC,
  TypeAccount.CCA,
  TypeAccount.LOC
];

export const ACCOUNT_TYPE_LIST: DropdownList[] = [
  { value: 'SDA', label: 'PRODUCT.TYPES.SDA' },
  { value: 'DDA', label: 'PRODUCT.TYPES.DDA' }
];

export const FETCH_PRODUCTS_RETRIES = 1;

export const PRODUCTS_ALLOWED_TO_CANCEL: ProductTypeDetail[] = [
  ProductTypeDetail.DGT,
  ProductTypeDetail.DPT
];

export const AFC_ACTIONS: ProductAction[] = [
  PRODUCT_ACTIONS[ProductActionType.Documents]
];

export const DDA_ACTIONS: ProductAction[] = [
  PRODUCT_ACTIONS[ProductActionType.ConfigCards],
  PRODUCT_ACTIONS[ProductActionType.BlockAccount],
  PRODUCT_ACTIONS[ProductActionType.Pockets],
  PRODUCT_ACTIONS[ProductActionType.WithoutCard],
  PRODUCT_ACTIONS[ProductActionType.MoneyOrder],
  PRODUCT_ACTIONS[ProductActionType.MobileRecharge],
  PRODUCT_ACTIONS[ProductActionType.Documents]
];

export const DLA_ACTIONS: ProductAction[] = [
  PRODUCT_ACTIONS[ProductActionType.Documents]
];

export const LOC_ACTIONS: ProductAction[] = [
  PRODUCT_ACTIONS[ProductActionType.DebtPurchase],
  PRODUCT_ACTIONS[ProductActionType.UseQuota],
  PRODUCT_ACTIONS[ProductActionType.DirectedPayments],
  PRODUCT_ACTIONS[ProductActionType.Security],
  PRODUCT_ACTIONS[ProductActionType.Documents]
];

export const CCA_ACTIONS: ProductAction[] = [
  PRODUCT_ACTIONS[ProductActionType.DebtPurchase],
  PRODUCT_ACTIONS[ProductActionType.UpdateInstallments],
  PRODUCT_ACTIONS[ProductActionType.DirectedPayments],
  PRODUCT_ACTIONS[ProductActionType.Documents]
];

export const SDA_ACTIONS: ProductAction[] = [
  PRODUCT_ACTIONS[ProductActionType.Remittances],
  PRODUCT_ACTIONS[ProductActionType.ConfigCards],
  PRODUCT_ACTIONS[ProductActionType.BlockAccount],
  PRODUCT_ACTIONS[ProductActionType.Pockets],
  PRODUCT_ACTIONS[ProductActionType.WithoutCard],
  PRODUCT_ACTIONS[ProductActionType.MoneyOrder],
  PRODUCT_ACTIONS[ProductActionType.MobileRecharge],
  PRODUCT_ACTIONS[ProductActionType.Documents]
];

export const TAG_AVAL_CUTOMIZATION_FROM_LINK_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'a un Tag AVAL',
  event_label:
    'ver información de tag aval - redirigir a personalización de tag aval'
};

export const TAG_AVAL_CUTOMIZATION_FROM_ICON_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'a un Tag AVAL',
  event_label: 'editar tag aval - redirigir a personalización de tag aval'
};

export const TAG_AVAL_COPY_EVENT: UtagEvent = {
  track: 'link',
  tealium_event: 'click',
  event_category: 'a un Tag AVAL',
  event_label: 'copiar tag aval'
};

export const TAG_AVAL_EVENTS: UtagEvent[] = [
  TAG_AVAL_CUTOMIZATION_FROM_LINK_EVENT,
  TAG_AVAL_CUTOMIZATION_FROM_ICON_EVENT,
  TAG_AVAL_COPY_EVENT
];
