import {
  ForgotPasswordState,
  initialForgotPasswordState
} from '@modules/auth/forgot-password/store/forgot-password.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './forgot-password.actions';

const featureReducer = createReducer(
  initialForgotPasswordState,
  on(actions.runForgotPasswordAction, (state: ForgotPasswordState) => ({
    ...state,
    working: true,
    completed: false,
    message: ''
  })),
  on(
    actions.runForgotPasswordSuccessAction,
    (state: ForgotPasswordState, { data }) => ({
      ...state,
      data,
      working: false,
      completed: true,
      message: ''
    })
  ),
  on(actions.runForgotPasswordErrorAction, (state: ForgotPasswordState) => ({
    ...state,
    working: false,
    completed: false
  }))
);

export const forgotPasswordReducer = (
  state: ForgotPasswordState,
  action: Action
): ForgotPasswordState => {
  return featureReducer(state, action);
};
