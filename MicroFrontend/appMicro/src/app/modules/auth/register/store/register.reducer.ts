import * as actions from '@modules/auth/register/store/register.actions';
import {
  initialRegisterState,
  RegisterState
} from '@modules/auth/register/store/register.state';
import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialRegisterState,
  on(actions.runRegisterAction, (state: RegisterState) => ({
    ...state,
    working: true,
    completed: false,
    message: ''
  })),
  on(actions.runRegisterSuccessAction, (state: RegisterState, { data }) => ({
    ...state,
    data,
    working: false,
    completed: true,
    message: ''
  })),
  on(
    actions.runRegisterErrorAction,
    actions.runRegisterErrorNotModalAction,
    (state: RegisterState) => ({
      ...state,
      working: false,
      completed: false
    })
  )
);

export const registerReducer = (
  state: RegisterState,
  action: Action
): RegisterState => {
  return featureReducer(state, action);
};
