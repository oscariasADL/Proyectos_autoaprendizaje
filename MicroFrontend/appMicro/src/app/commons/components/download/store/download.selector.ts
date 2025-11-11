import { createFeatureSelector, createSelector } from '@ngrx/store';
import { downloadFeatureName, DownloadState } from './download.state';

const downloadState = createFeatureSelector<DownloadState>(downloadFeatureName);

export const downloadWorkingSelector = createSelector(
  downloadState,
  (state: DownloadState) => state.working
);

export const downloadCompletedSelector = createSelector(
  downloadState,
  (state: DownloadState) => state.completed
);
