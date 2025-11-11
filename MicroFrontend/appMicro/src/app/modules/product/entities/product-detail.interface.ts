export interface ProductDetailData {
  image?: string;
  number: string;
  list: ProductDetailItem[];
  quickList?: ProductDetailItem[];
  infoText?: string;
  dropdownList?: {
    title: string;
    list: ProductDetailItem[];
  };
  franchise?: string;
}

export interface ProductDetailItem {
  type: ProductDetailItemType;
  label: string;
  id: string;
  value?: number | string;
  text?: string;
  hasDivider?: boolean;
  info?: string;
  labelClass?: string;
  valueClass?: string;
}

export enum ProductDetailItemType {
  Normal = 'normal',
  NormalBold = 'normal-bold',
  Opaque = 'opaque',
  Highlighted = 'highlighted',
  ValueHighlighted = 'value-highlighted',
  Button = 'Button',
  Main = 'main'
}

export enum SalaryAdvanceStatus {
  ACTIVA = 'ACTIVA',
  BLOQUEADA = 'BLOQUEADA'
}
