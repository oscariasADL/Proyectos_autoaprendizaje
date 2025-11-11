import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  movementFeatureName,
  MovementsDetailState,
  MovementsHistoryState,
  MovementsState,
  MovementState
} from './movement.state';

const movementState = createFeatureSelector<MovementState>(movementFeatureName);

export const movementSelector = createSelector(
  movementState,
  (state: MovementState) => state.movements
);

export const movementsSelector = createSelector(
  movementSelector,
  (state: MovementsState) => state.movements
);

export const movementsWorkingSelector = createSelector(
  movementSelector,
  (state: MovementsState) => state.working
);

export const movementsCompletedSelector = createSelector(
  movementSelector,
  (state: MovementsState) => state.completed
);

export const movementsDetailSelector = createSelector(
  movementState,
  (state: MovementState) => state.movementsDetail
);

export const movementsDetailResultsSelector = createSelector(
  movementsDetailSelector,
  (state: MovementsDetailState) =>
    !isNullOrUndefined(state.response) ? state.response.results : []
);

export const movementsDetailWorkingSelector = createSelector(
  movementsDetailSelector,
  (state: MovementsDetailState) => state.working
);

export const movementsDetailCompletedSelector = createSelector(
  movementsDetailSelector,
  (state: MovementsDetailState) => state.completed
);

export const movementsHistorySelector = createSelector(
  movementState,
  (state: MovementState) => state.movementsHistory
);

export const movementsHistoryResultsSelector = createSelector(
  movementsHistorySelector,
  (state: MovementsHistoryState) =>
    !isNullOrUndefined(state.response) ? state.response.results : []
);

export const movementsHistoryPayloadSelector = createSelector(
  movementsHistorySelector,
  (state: MovementsHistoryState) => state.payload
);

export const movementsHistoryWorkingSelector = createSelector(
  movementsHistorySelector,
  (state: MovementsHistoryState) => state.working
);

export const movementsHistoryCompletedSelector = createSelector(
  movementsHistorySelector,
  (state: MovementsHistoryState) => state.completed
);
