import { createFeatureSelector, createSelector } from '@ngrx/store';
import { homeFeatureName, HomeState } from './home.state';

const homeState = createFeatureSelector<HomeState>(homeFeatureName);

export const balanceCategorySelector = createSelector(
  homeState,
  (state: HomeState) => state.balanceCategory
);

export const balanceCategoriesSelector = createSelector(
  homeState,
  (state: HomeState) => state.balanceCategories
);

export const homeAlertsSelector = createSelector(
  homeState,
  (state: HomeState) => state.homeAlerts
);

export const homeTimerSelector = createSelector(
  homeState,
  (state: HomeState) => state.timer
);

export const homeSelector = createSelector(
  homeState,
  (state: HomeState) => state
);

export const homeHasCreditProducts = createSelector(
  homeState,
  (state: HomeState) => state.hasCreditProducts
);

export const homeCreditProductsError = createSelector(
  homeState,
  (state: HomeState) => state.creditProductsError
);
