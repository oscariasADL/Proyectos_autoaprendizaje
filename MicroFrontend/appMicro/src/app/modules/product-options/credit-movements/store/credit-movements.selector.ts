import {
  creditMovementsFeatureName,
  CreditMovementsState
} from '@modules/product-options/credit-movements/store/credit-movements.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const paymentCreditsState = createFeatureSelector<CreditMovementsState>(
  creditMovementsFeatureName
);

export const creditMovementsSelectors = createSelector(
  paymentCreditsState,
  (state: CreditMovementsState) => state.movements
);

export const creditMovementsWorkingSelectors = createSelector(
  paymentCreditsState,
  (state: CreditMovementsState) => state.working
);

export const creditMovementsCompletedSelectors = createSelector(
  paymentCreditsState,
  (state: CreditMovementsState) => state.completed
);
