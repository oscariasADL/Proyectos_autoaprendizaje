import { TypeProduct } from '@commons/entities/product/balance.interface';
import { AvvIconsBtnList } from '@commons/entities/avv-icons-btn-list/AvviconsBtnList.entities';

export const TYPE_PRODUCT_CATEGORIES: Record<string, AvvIconsBtnList> = {
  [TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS]: {
    label: 'EXTRACTS.CATEGORIES.SAVING_ACCOUNT',
    image: 'illustrationsV2/mano-cuenta.svg',
    id: 'btn-savings-accounts-extracts'
  },
  [TypeProduct.MY_CREDIT_CARDS]: {
    label: 'EXTRACTS.CATEGORIES.CREDIT_CARD',
    image: 'illustrationsV2/tarjeta-dinero-regular.svg',
    id: 'btn-credit-cards-extract'
  },
  [TypeProduct.MY_CREDITS]: {
    label: 'EXTRACTS.CATEGORIES.CREDITS',
    image: 'illustrationsV2/certificado-dinero-regular.svg',
    id: 'btn-credits-extracts'
  } /*,
  [TypeProduct.ROTATING_CREDITS]: {
    label: 'EXTRACTS.CATEGORIES.ROTATING_CREDITS',
    image: 'icons/transferir.svg',
    id: 'btn-rotating-credits-extracts'
  }*/
};

export const TYPE_PRODUCT_CATEGORIES_TITLES: Record<string, string> = {
  [TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS]:
    'EXTRACTS.CATEGORIES.SAVING_ACCOUNT',
  [TypeProduct.MY_CREDIT_CARDS]: 'EXTRACTS.CATEGORIES.CREDIT_CARD',
  [TypeProduct.MY_CREDITS]: 'EXTRACTS.CATEGORIES.CREDITS',
  [TypeProduct.ROTATING_CREDITS]: 'EXTRACTS.CATEGORIES.ROTATING_CREDITS'
};

export const SELECT_SUB_PRODUCT_URL = 'extracts/select-product';
export const SELECTED_PRODUCT_URL = 'extracts/selected-product';
