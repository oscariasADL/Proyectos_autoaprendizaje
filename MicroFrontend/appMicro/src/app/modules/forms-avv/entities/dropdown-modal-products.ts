import { ProductCard } from '@modules/product/entities/product-card.interface';

export interface ModalProducts {
  type?: ModalTypeProducts;
  label: string;
  productsCards: ProductCard[];
}

export enum ModalTypeProducts {
  DEBIT_CARDS = 'debitCards',
  CREDIT_CARDS = 'creditCards',
  ACCOUNTS = 'accounts'
}
