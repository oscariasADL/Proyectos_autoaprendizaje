import {
  registerFeatureName,
  RegisterState
} from '@modules/auth/register/store/register.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const registerState = createFeatureSelector<RegisterState>(registerFeatureName);

export const registerDataSelector = createSelector(
  registerState,
  (state: RegisterState) => state.data
);

export const registerWorkingSelector = createSelector(
  registerState,
  (state: RegisterState) => state.working
);
