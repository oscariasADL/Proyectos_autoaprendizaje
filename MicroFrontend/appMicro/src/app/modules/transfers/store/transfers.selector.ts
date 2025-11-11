import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RemittanceState } from './transfers.reducer';

export const selectRemittanceState =
  createFeatureSelector<RemittanceState>('remittance');

export const selectRemittanceLoading = createSelector(
  selectRemittanceState,
  (state) => state.loading
);

export const selectRemittanceResult = createSelector(
  selectRemittanceState,
  (state) => state?.result ?? null
);

export const selectRemittanceError = createSelector(
  selectRemittanceState,
  (state) => state.error
);
