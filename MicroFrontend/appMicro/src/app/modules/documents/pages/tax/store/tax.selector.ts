import { createFeatureSelector, createSelector } from '@ngrx/store';
import { taxFeatureName, TaxState } from './tax.state';

const taxState = createFeatureSelector<TaxState>(taxFeatureName);

export const downloadWorkingSelector = createSelector(
  taxState,
  (state: TaxState) => state.working
);

export const downloadCompletedSelector = createSelector(
  taxState,
  (state: TaxState) => state.completed
);

export const downloadFileYearSelector = createSelector(
  taxState,
  (state: TaxState) => state.downloadFileYear
);

export const isDownloadingSomeCertificateSelector = createSelector(
  taxState,
  (state: TaxState) => state.downloadFileYear > 0
);
