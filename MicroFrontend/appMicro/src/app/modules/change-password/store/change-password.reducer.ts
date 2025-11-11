import * as actions from '@modules/change-password/store/change-password.actions';
import {
  ChangePasswordState,
  initialChangePasswordState
} from '@modules/change-password/store/change-password.state';

import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialChangePasswordState,
  on(actions.changePasswordAction, (state: ChangePasswordState) => ({
    ...state,
    working: true,
    completed: false
  })),
  on(actions.changePasswordSuccessAction, (state: ChangePasswordState) => ({
    ...state,
    working: false,
    completed: true
  })),
  on(
    actions.changePasswordErrorAction,
    (state: ChangePasswordState, { message, errorCode }) => ({
      ...state,
      working: false,
      completed: false,
      message,
      errorCode
    })
  )
);

export const changePasswordReducer = (
  state: ChangePasswordState,
  action: Action
): ChangePasswordState => {
  return featureReducer(state, action);
};
