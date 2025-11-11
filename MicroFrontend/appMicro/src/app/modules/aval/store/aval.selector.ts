import { mapAvalProducts } from '@modules/aval/mappers/aval-products.mapper';
import { avalFeatureName, AvalState } from '@modules/aval/store/aval.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const avalState = createFeatureSelector<AvalState>(avalFeatureName);

export const avalProductsSelector = createSelector(
  avalState,
  (state: AvalState) => mapAvalProducts(state.products.data)
);

export const avalProductsWorkingSelector = createSelector(
  avalState,
  (state: AvalState) => state.products.working
);

export const avalProductsCompletedSelector = createSelector(
  avalState,
  (state: AvalState) => state.products.completed
);

export const tuplusSelector = createSelector(
  avalState,
  (state: AvalState) => state.tuplus.data
);

export const tuplusWorkingSelector = createSelector(
  avalState,
  (state: AvalState) => state.tuplus.working
);

export const tuplusCompletedSelector = createSelector(
  avalState,
  (state: AvalState) => state.tuplus.completed
);

export const stocksSelector = createSelector(
  avalState,
  (state: AvalState) => state.stocks.data
);

export const stocksWorkingSelector = createSelector(
  avalState,
  (state: AvalState) => state.stocks.working
);

export const stocksCompletedSelector = createSelector(
  avalState,
  (state: AvalState) => state.stocks.completed
);

export const stocksDetailSelector = createSelector(
  avalState,
  (state: AvalState) => state.stocksDetail.data
);

export const stocksDetailWorkingSelector = createSelector(
  avalState,
  (state: AvalState) => state.stocksDetail.working
);

export const stocksDetailCompletedSelector = createSelector(
  avalState,
  (state: AvalState) => state.stocksDetail.completed
);
