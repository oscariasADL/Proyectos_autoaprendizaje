import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  carechannelsFeatureName,
  CarechannelsState
} from './care-channels.state';

const careChannelState = createFeatureSelector<CarechannelsState>(
  carechannelsFeatureName
);

export const adviserSelector = createSelector(
  careChannelState,
  (state: CarechannelsState) => state.adviser
);

export const adviserWorkingSelector = createSelector(
  careChannelState,
  (state: CarechannelsState) => state.working
);
