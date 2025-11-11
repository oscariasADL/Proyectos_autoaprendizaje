import {
  changePasswordFeatureName,
  ChangePasswordState
} from '@modules/change-password/store/change-password.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const changePasswordState = createFeatureSelector<ChangePasswordState>(
  changePasswordFeatureName
);

export const changePasswordSelector = createSelector(
  changePasswordState,
  (state: ChangePasswordState) => state
);
