import { Action, createReducer, on } from '@ngrx/store';

import {
  initialActivateTokenState,
  ActivateTokenState
} from '@modules/wallets/pages/activate-token/store/activate-token.state';
import * as actions from '@modules/wallets/pages/activate-token/store/activate-token.actions';

const featureReducer = createReducer(
  initialActivateTokenState,
  on(actions.fetchLastTokenAction, (state) => ({
    ...state,
    token: null,
    working: true,
    completed: false
  })),
  on(actions.fetchLastTokenSuccessAction, (state, { token }) => ({
    ...state,
    token,
    working: false,
    completed: true
  })),
  on(actions.fetchLastTokenErrorAction, (state, { error }) => ({
    ...state,
    error,
    working: false,
    completed: false
  })),
  on(actions.activateTokenAction, (state, { token }) => ({
    ...state,
    token,
    working: true,
    completed: false
  })),
  on(actions.activateTokenSuccessAction, (state) => ({
    ...state,
    isActivated: true,
    working: false,
    completed: true
  })),
  on(actions.fetchLastTokenErrorAction, (state, { error }) => ({
    ...state,
    isActivated: false,
    error,
    working: false,
    completed: false
  }))
);

export const activateTokenReducer = (
  state: ActivateTokenState,
  action: Action
) => featureReducer(state, action);
