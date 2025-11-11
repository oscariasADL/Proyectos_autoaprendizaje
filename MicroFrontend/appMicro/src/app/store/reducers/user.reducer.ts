import { Action, createReducer, on } from '@ngrx/store';
import * as globalActions from '@store/actions/global.actions';
import { initialUserState, UserState } from '@store/state/user.state';

const featureReducer = createReducer(
  initialUserState,
  on(globalActions.setUserDataAction, (state: UserState, { data }) => ({
    ...state,
    data
  })),
  on(globalActions.setBasicDataAction, (state: UserState, { basic }) => ({
    ...state,
    basic
  })),
  on(
    globalActions.setLoginWithBiometric,
    (state: UserState, { loginWithBiometric }) => ({
      ...state,
      loginWithBiometric
    })
  ),
  on(
    globalActions.setComplementaryServicesStateAction,
    (
      state: UserState,
      { state: complementaryServices, error: complementaryServicesError }
    ) => ({
      ...state,
      complementaryServices,
      complementaryServicesError
    })
  )
);

export const userReducer = (state: UserState, action: Action): UserState => {
  return featureReducer(state, action);
};
