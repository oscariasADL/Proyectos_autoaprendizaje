import {
  updatePasswordFeatureName,
  UpdatePasswordState
} from '@modules/auth/update-password/store/update-password.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const updatePasswordState = createFeatureSelector<UpdatePasswordState>(
  updatePasswordFeatureName
);

export const updatePasswordCompletedSelector = createSelector(
  updatePasswordState,
  (state: UpdatePasswordState) => state.completed
);
