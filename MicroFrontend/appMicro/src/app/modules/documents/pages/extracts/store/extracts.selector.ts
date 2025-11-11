import {
  extractsFeatureName,
  ExtractsState
} from '@modules/documents/pages/extracts/store/extracts.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const extractsState = createFeatureSelector<ExtractsState>(extractsFeatureName);

export const periodsSelector = createSelector(
  extractsState,
  (state: ExtractsState) => state.periods
);

export const periodsWorkingSelector = createSelector(
  extractsState,
  (state: ExtractsState) => state.working
);

export const periodsCompletedSelector = createSelector(
  extractsState,
  (state: ExtractsState) => state.completed
);

export const downloadFileNameSelector = createSelector(
  extractsState,
  (state: ExtractsState) => state.downloadFileName
);

export const isDownloadingSomeFileSelector = createSelector(
  extractsState,
  (state: ExtractsState) => state.downloadFileName?.length > 0
);
