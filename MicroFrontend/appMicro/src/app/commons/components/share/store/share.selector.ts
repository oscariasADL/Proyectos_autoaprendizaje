import {
  shareFeatureName,
  ShareState
} from '@commons/components/share/store/share.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const shareState = createFeatureSelector<ShareState>(shareFeatureName);

export const shareWorkingSelector = createSelector(
  shareState,
  (state: ShareState) => state.working
);

export const shareCompletedSelector = createSelector(
  shareState,
  (state: ShareState) => state.completed
);
