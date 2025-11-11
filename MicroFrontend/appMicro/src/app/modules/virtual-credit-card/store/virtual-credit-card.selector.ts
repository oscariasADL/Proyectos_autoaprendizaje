import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  virtualCreditCardFeatureName,
  VirtualCreditCardState
} from '@modules/virtual-credit-card/store/virtual-credit-card.state';

const virtualCreditCardState = createFeatureSelector<VirtualCreditCardState>(
  virtualCreditCardFeatureName
);

export const virtualCreditCardProductSelected = createSelector(
  virtualCreditCardState,
  (state: VirtualCreditCardState) => state.productSelected
);

export const virtualCreditCardListSelector = createSelector(
  virtualCreditCardState,
  (state: VirtualCreditCardState) => state.cards
);

export const virtualCreditCardMaxCardsLimitSelector = createSelector(
  virtualCreditCardState,
  (state: VirtualCreditCardState) => state.maxCardsLimit
);

export const virtualCreditCardTotalCardsCreated = createSelector(
  virtualCreditCardState,
  (state: VirtualCreditCardState) => state.totalCardsCreated
);

export const virtualCreditCardWorkingSelector = createSelector(
  virtualCreditCardState,
  (state: VirtualCreditCardState) => state.working
);

export const virtualCreditCardCompletedSelector = createSelector(
  virtualCreditCardState,
  (state: VirtualCreditCardState) => state.completed
);

export const virtualCreditCardActivateUrlBackToSelector = createSelector(
  virtualCreditCardState,
  (state: VirtualCreditCardState) => state.activateUrlBackTo
);

export const virtualCreditCardCreditLimitSelector = createSelector(
  virtualCreditCardState,
  (state: VirtualCreditCardState) => state.creditLimit
);
