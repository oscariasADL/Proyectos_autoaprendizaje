import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';

export const creditMovementsFeatureName = 'creditMovementsModule';

export type CreditMovementsState = Readonly<{
  movements: CreditMovement[];
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialCreditMovementsState: CreditMovementsState = {
  movements: null,
  working: false,
  completed: false,
  message: ''
};
