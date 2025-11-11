import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  silentEnrollmentFeatureName,
  SilentEnrollmentState
} from './silent-enrollment.state';

const silentEnrollmentState = createFeatureSelector<SilentEnrollmentState>(
  silentEnrollmentFeatureName
);

export const silentEnrollmentDataSelector = createSelector(
  silentEnrollmentState,
  (state: SilentEnrollmentState) => state.data
);

export const silentEnrollmentWorkingSelector = createSelector(
  silentEnrollmentState,
  (state: SilentEnrollmentState) => state.working
);
