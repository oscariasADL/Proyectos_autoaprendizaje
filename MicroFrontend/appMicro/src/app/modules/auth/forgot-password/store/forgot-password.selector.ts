import {
  forgotPasswordFeatureName,
  ForgotPasswordState
} from '@modules/auth/forgot-password/store/forgot-password.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const forgotPasswordState = createFeatureSelector<ForgotPasswordState>(
  forgotPasswordFeatureName
);

export const forgotPasswordDataSelector = createSelector(
  forgotPasswordState,
  (state: ForgotPasswordState) => state.data
);

export const forgotPasswordWorkingSelector = createSelector(
  forgotPasswordState,
  (state: ForgotPasswordState) => state.working
);
