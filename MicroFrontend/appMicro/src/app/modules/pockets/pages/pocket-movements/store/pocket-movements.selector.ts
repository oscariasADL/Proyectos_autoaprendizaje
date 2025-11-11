import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  pocketMovementsFeatureName,
  PocketMovementsState
} from '@modules/pockets/pages/pocket-movements/store/pocket-movements.state';

const pocketMovementsState = createFeatureSelector<PocketMovementsState>(
  pocketMovementsFeatureName
);

export const pocketMovementsSelector = createSelector(
  pocketMovementsState,
  (state: PocketMovementsState) => state.movements
);

export const pocketMovementsWorkingSelector = createSelector(
  pocketMovementsState,
  (state: PocketMovementsState) => state.working
);

export const pocketMovementsCompletedSelector = createSelector(
  pocketMovementsState,
  (state: PocketMovementsState) => state.completed
);
