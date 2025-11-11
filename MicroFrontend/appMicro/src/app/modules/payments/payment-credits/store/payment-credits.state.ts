import {
  PaymentCredit,
  PaymentCredits,
  PaymentFetchFilter
} from '@modules/payments/payment-credits/entities/payment-credits.interface';

export const paymentCreditsFeatureName = 'paymentCreditsModuleState';

export type PaymentCreditsState = Readonly<{
  data: PaymentCredits;
  working: boolean;
  completed: boolean;
  message: string;
  creditSelected: PaymentCredit;
  filterSelected: PaymentFetchFilter;
}>;

export const initialPaymentCreditsState: PaymentCreditsState = {
  data: null,
  working: false,
  completed: false,
  message: '',
  creditSelected: null,
  filterSelected: PaymentFetchFilter.OWN
};
