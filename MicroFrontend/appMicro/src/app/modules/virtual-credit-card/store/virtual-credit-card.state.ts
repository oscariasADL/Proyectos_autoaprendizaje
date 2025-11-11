import { VirtualCreditCard } from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';

export const virtualCreditCardFeatureName = 'virtualCreditCardModuleState';

export type VirtualCreditCardState = Readonly<{
  cards: VirtualCreditCard[];
  creditLimit: number;
  maxCardsLimit: number;
  totalCardsCreated: number;
  working: boolean;
  completed: boolean;
  message: string;
  activateUrlBackTo: string;
  productSelected: ProductDetail;
}>;

export const initialVirtualCreditCardState: VirtualCreditCardState = {
  cards: [],
  creditLimit: null,
  maxCardsLimit: null,
  totalCardsCreated: null,
  working: false,
  completed: false,
  message: '',
  activateUrlBackTo: null,
  productSelected: null
};
