import { GenericResponse } from '@commons/entities/response/response.interface';
import { DigitalDebitCard } from '../entities/digital-debit-card.interface';
import { Product } from '@commons/entities/product/product.interface';

export const digitalDebitCardFeatureName = 'digitalDebitCardModuleState';

export type DigitalDebitCardState = Readonly<{
  cards: DigitalDebitCard[];
  working: boolean;
  completed: boolean;
  message: string;
  cardsViewed: string;
  response: GenericResponse;
  productSelected: Product;
  activateUrlBackTo: string;
}>;

export const initialDigitalDebitCardState: DigitalDebitCardState = {
  cards: [],
  working: false,
  completed: false,
  message: '',
  cardsViewed: '',
  response: null,
  productSelected: null,
  activateUrlBackTo: null
};
