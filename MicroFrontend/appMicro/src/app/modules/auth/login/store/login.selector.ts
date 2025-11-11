import { createFeatureSelector, createSelector } from '@ngrx/store';
import { loginFeatureName, LoginState } from './login.state';

const loginState = createFeatureSelector<LoginState>(loginFeatureName);

export const workingSelector = createSelector(
  loginState,
  (state: LoginState) => state?.working
);

export const isLoggedSelector = createSelector(
  loginState,
  (state: LoginState) => state?.completed
);

export const loginTypeSelector = createSelector(
  loginState,
  (state: LoginState) => state?.type
);

export const loginUserDataBasicClientDtoSelector = createSelector(
  loginState,
  (state: LoginState) => state?.data?.dataBasicClientDto
);

export const loginUserData = createSelector(
  loginState,
  (state: LoginState) => state?.data
);
