import { mapPaymentsData } from '@modules/payments/payment-credits/mappers/payment-credits.mapper';
import {
  paymentCreditsFeatureName,
  PaymentCreditsState
} from '@modules/payments/payment-credits/store/payment-credits.state';
import { nicknamesSelector } from '@modules/product/store/product.selector';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const paymentCreditsState = createFeatureSelector<PaymentCreditsState>(
  paymentCreditsFeatureName
);

export const paymentsSelectors = createSelector(
  paymentCreditsState,
  (state: PaymentCreditsState) => state.data
);

export const paymentsWorkingSelectors = createSelector(
  paymentCreditsState,
  (state: PaymentCreditsState) => state.working
);

export const paymentsCompletedSelectors = createSelector(
  paymentCreditsState,
  (state: PaymentCreditsState) => state.completed
);

export const filterSelectedSelector = createSelector(
  paymentCreditsState,
  (state: PaymentCreditsState) => state.filterSelected
);

export const creditSelectedSelector = createSelector(
  paymentCreditsState,
  (state: PaymentCreditsState) => state.creditSelected
);

export const paymentsDataSelectors = createSelector(
  paymentsSelectors,
  nicknamesSelector,
  mapPaymentsData
);
