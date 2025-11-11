import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  pocketDetailWithReturnsFeatureName,
  PocketDetailWithReturnsState
} from './pocket-detail-with-returns.state';

const pocketDetailWithReturnsState =
  createFeatureSelector<PocketDetailWithReturnsState>(
    pocketDetailWithReturnsFeatureName
  );

export const pocketDetailWithReturnsSelector = createSelector(
  pocketDetailWithReturnsState,
  (state: PocketDetailWithReturnsState) => state.pocket
);

export const pocketDetailWithReturnsWorkingSelector = createSelector(
  pocketDetailWithReturnsState,
  (state: PocketDetailWithReturnsState) => state.working
);

export const pocketDetailWithReturnsCompletedSelector = createSelector(
  pocketDetailWithReturnsState,
  (state: PocketDetailWithReturnsState) => state.completed
);

export const pocketWithReturnsMovementsSelector = createSelector(
  pocketDetailWithReturnsState,
  (state: PocketDetailWithReturnsState) => state.movements
);

export const pocketWithReturnsMovementsWorkingSelector = createSelector(
  pocketDetailWithReturnsState,
  (state: PocketDetailWithReturnsState) => state.workingMovements
);

export const pocketWithReturnsMovementsCompletedSelector = createSelector(
  pocketDetailWithReturnsState,
  (state: PocketDetailWithReturnsState) => state.completedMovements
);
