import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomizeAvalTagState } from './customize-aval-tag.reducer';

export const selectCustomizeAvalTagState =
  createFeatureSelector<CustomizeAvalTagState>('customizeAvalTag');

export const selectRandomKey = createSelector(
  selectCustomizeAvalTagState,
  (state) => state.randomKey
);

export const selectLoading = createSelector(
  selectCustomizeAvalTagState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectCustomizeAvalTagState,
  (state) => state.error
);
