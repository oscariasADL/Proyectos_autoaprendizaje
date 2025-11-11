import { mapPocketsHome } from '@modules/pockets/pages/pockets-home/mappers/pockets-home.mapper';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pocketsHomeFeatureName, PocketsHomeState } from './pockets-home.state';

const pocketsHomeState = createFeatureSelector<PocketsHomeState>(
  pocketsHomeFeatureName
);

export const pocketsHomeSelector = createSelector(
  pocketsHomeState,
  (state: PocketsHomeState) => mapPocketsHome(state.pockets)
);

export const pocketsWorkingSelector = createSelector(
  pocketsHomeState,
  (state: PocketsHomeState) => state.working
);

export const pocketsCompletedSelector = createSelector(
  pocketsHomeState,
  (state: PocketsHomeState) => state.completed
);
