import { PointsPerBankI } from '@commons/entities/product/aval-products-response.interface';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';

export interface Balance {
  typeProduct: TypeProduct;
  name: string;
  description: string;
  balanceTotal: number;
  quantity: number;
  flag?: string;
  products: Product[];
  pointsPerBank: PointsPerBankI[];
}

export enum TypeProduct {
  ALL = 0,
  MY_ACCOUNTS_AND_DEBIT_CARDS = 1,
  MY_CREDIT_CARDS = 2,
  ROTATING_CREDITS = 3,
  MY_CREDITS = 4,
  MY_CDT = 5,
  TU_PLUS = 6,
  MANDATORY_PENSIONS = 7,
  VOLUNTARY_PENSIONS = 8,
  CESANTIAS = 9,
  FACILPASS = 10,
  AVAL = 800,
  MY_POCKETS = 700,
  FIDUCIAS = 12,
  DALE = 13,
  DIGITAL_DEBIT_CARD = 14
}

export const AVAL_TYPES = [TypeProduct.TU_PLUS, TypeProduct.AVAL];

export const SHOW_AVAL_PRODUCTS = [TypeProduct.ALL, TypeProduct.AVAL];

export const SHOULD_SHOW_RATE = [TypeAccount.CCA, TypeAccount.LOC];

export const HIDE_MOVEMENTS = [
  TypeAccount.DLA,
  TypeAccount.CDA,
  TypeAccount.FID
];

export const HAS_MOVEMENTS_DETAIL = [
  TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS,
  TypeProduct.MY_CREDIT_CARDS,
  TypeProduct.ROTATING_CREDITS,
  TypeProduct.MY_CREDITS,
  TypeProduct.MY_CDT
];

export const HAS_EXTRACTS = [
  TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS,
  TypeProduct.MY_CREDIT_CARDS,
  TypeProduct.ROTATING_CREDITS,
  TypeProduct.MY_CREDITS
];

export enum ProductCategory {
  accounts = 1,
  cards = 2,
  credits = 3,
  all = 4,
  cdt = 5,
  aval = 6,
  tuPlus = 7,
  fiducias = 12
}

export enum ProductBodyType {
  available = 'available',
  information = 'information',
  progress = 'progress'
}

export interface ProductCategoryItem {
  label: string;
  id: string;
  type: ProductCategory;
}

export const PRODUCT_TYPE_CATEGORIES: DropdownList[] = [
  {
    label: 'Todos',
    value: '0',
    icon: 'icon-retiro'
  },
  {
    label: 'Cuentas',
    value: TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS.toString(),
    icon: 'icon-retiro'
  },
  {
    label: 'Tarjetas',
    value: TypeProduct.MY_CREDIT_CARDS.toString(),
    icon: 'icon-tarjeta'
  },
  {
    label: 'Tarjetas Digitales',
    value: TypeProduct.DIGITAL_DEBIT_CARD.toString(),
    icon: 'icon-tarjetas'
  },
  {
    label: 'Créditos rotativos',
    value: TypeProduct.ROTATING_CREDITS.toString(),
    icon: 'icon-depositos'
  },
  {
    label: 'Créditos',
    value: TypeProduct.MY_CREDITS.toString(),
    icon: 'icon-depositos'
  },
  {
    label: 'Inversiones',
    value: TypeProduct.MY_CDT.toString(),
    icon: 'icon-mis_otros_creditos'
  },
  {
    label: 'Bolsillos',
    value: TypeProduct.MY_POCKETS.toString(),
    icon: 'icon-bolsillos'
  },
  {
    label: 'Aval',
    value: TypeProduct.AVAL.toString(),
    icon: 'icon-estrella'
  },
  {
    label: 'Fiducias',
    value: TypeProduct.FIDUCIAS.toString(),
    icon: 'icon-mis_otros_creditos'
  }
];

export const PRODUCT_CATEGORIES: ProductCategoryItem[] = [
  {
    label: 'Cuentas',
    id: 'btn-filter-accounts',
    type: ProductCategory.accounts
  },
  {
    label: 'Tarjetas',
    id: 'btn-filter-cards',
    type: ProductCategory.cards
  },
  {
    label: 'Créditos',
    id: 'btn-filter-credits',
    type: ProductCategory.credits
  },
  {
    label: 'CDT',
    id: 'btn-filter-cdt',
    type: ProductCategory.cdt
  },
  {
    label: 'Aval',
    id: 'btn-filter-aval',
    type: ProductCategory.aval
  },
  {
    label: 'Fiducias',
    id: 'btn-filter-fiducias',
    type: ProductCategory.fiducias
  }
];

export const SLIDE_OPTS = {
  initialSlide: 1,
  speed: 400,
  width: 310
};

export enum HomeProductType {
  product = 'product',
  group = 'group'
}

export interface HomeProduct {
  type?: HomeProductType;
  product?: Product;
  filter?: number;
  url?: string;
  balance?: number;
  description?: string;
  productType?: string;
  categoryName?: string;
  balanceTypeProduct?: TypeProduct;
}

export interface BalanceInfoItem {
  description: string;
  amount: string;
}

export interface BalanceInfo {
  items: BalanceInfoItem[];
  totalBalance?: string;
}
