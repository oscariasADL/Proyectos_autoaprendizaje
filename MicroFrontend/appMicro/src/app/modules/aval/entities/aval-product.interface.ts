export interface AvalProductItem {
  label?: string;
  value?: number | string;
  isText?: boolean;
  isEnd?: boolean;
}

export interface AvalProduct {
  icon: string;
  title: string;
  description: string;
  amount: number;
  items: AvalProductItem[];
  bankCode?: string;
}

export interface AvalProductList {
  label: string;
  products: AvalProduct[];
}
