import { BANK_GROUP } from '@commons/constants/card.constants';

export interface AvalItem {
  icon: string;
  label: string;
  url: string;
}

export const AVAL_PRODUCT_LABEL = {
  [BANK_GROUP.BOGOTA_CODE]: 'Banco de Bogotá',
  [BANK_GROUP.OCCIDENTE_CODE]: 'Banco de Occidente',
  [BANK_GROUP.POPULAR_CODE]: 'Banco Popular',
  [BANK_GROUP.PORVENIR_CODE]: 'Porvenir',
  [BANK_GROUP.FACILPASS_CODE]: 'FacilPass',
  [BANK_GROUP.DALE]: 'dale!'
};

export const AVAL_PRODUCT_ICON = {
  [BANK_GROUP.BOGOTA_CODE]: 'aval-icons/banco-bogota.svg',
  [BANK_GROUP.OCCIDENTE_CODE]: 'aval-icons/banco-occidente.svg',
  [BANK_GROUP.POPULAR_CODE]: 'aval-icons/banco-popular.svg',
  [BANK_GROUP.PORVENIR_CODE]: 'aval-icons/porvenir.svg',
  [BANK_GROUP.FACILPASS_CODE]: 'aval-icons/facilpass.svg',
  [BANK_GROUP.DALE]: 'aval-icons/dale.svg'
};

export const AVAL_PRODUCT_ICON_CAROUSEL = {
  [BANK_GROUP.BOGOTA_CODE]: 'aval-icons/banco-bogota-new.svg',
  [BANK_GROUP.OCCIDENTE_CODE]: 'aval-icons/banco-occidente-new.svg',
  [BANK_GROUP.POPULAR_CODE]: 'aval-icons/banco-popular-new.svg',
  [BANK_GROUP.PORVENIR_CODE]: 'aval-icons/porvenir-new.svg',
  [BANK_GROUP.FACILPASS_CODE]: 'aval-icons/facilpass-new.svg',
  [BANK_GROUP.DALE]: 'aval-icons/dale-new.svg'
};
