import {
  mapDigitalDebitCard,
  mapDigitalDebitCardProducts,
  mapShowDigitalDebitCardPanel
} from '@modules/digital-debit-card/mappers/digital-debit-card.mapper';
import {
  digitalDebitCardFeatureName,
  DigitalDebitCardState
} from '@modules/digital-debit-card/store/digital-debit-card.state';
import { balanceSelector } from '@modules/product/store/product.selector';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const digitalDebitCardState = createFeatureSelector<DigitalDebitCardState>(
  digitalDebitCardFeatureName
);

export const digitalDebitCardCompletedSelector = createSelector(
  digitalDebitCardState,
  (state: DigitalDebitCardState) => state?.completed
);

export const digitalDebitCardListSelector = createSelector(
  digitalDebitCardState,
  (state: DigitalDebitCardState) => state?.cards
);

export const digitalDebitCardsViewedSelector = createSelector(
  digitalDebitCardState,
  (state: DigitalDebitCardState) => state?.cardsViewed
);

export const createDigitalDebitCardResponseSelector = createSelector(
  digitalDebitCardState,
  (state: DigitalDebitCardState) => state?.response
);

export const digitalDebitCardsSelector = createSelector(
  digitalDebitCardListSelector,
  digitalDebitCardsViewedSelector,
  mapDigitalDebitCard
);

export const digitalDebitCardProductsSelector = createSelector(
  balanceSelector,
  digitalDebitCardsSelector,
  mapDigitalDebitCardProducts
);

export const showDigitalDebitCardPanelSelector = createSelector(
  digitalDebitCardProductsSelector,
  mapShowDigitalDebitCardPanel
);

export const digitalDebitCardActivateUrlBackToSelector = createSelector(
  digitalDebitCardState,
  (state: DigitalDebitCardState) => state?.activateUrlBackTo
);

export const digitalDebitCardProductSelectedSelector = createSelector(
  digitalDebitCardState,
  (state: DigitalDebitCardState) => state?.productSelected
);
