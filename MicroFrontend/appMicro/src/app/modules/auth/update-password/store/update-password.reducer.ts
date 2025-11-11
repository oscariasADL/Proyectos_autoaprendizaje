import * as actions from '@modules/auth/update-password/store/update-password.actions';
import {
  initialUpdatePasswordState,
  UpdatePasswordState
} from '@modules/auth/update-password/store/update-password.state';
import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialUpdatePasswordState,
  on(actions.updatePasswordAction, (state: UpdatePasswordState) => ({
    ...state,
    working: true,
    completed: false,
    message: ''
  })),
  on(actions.updatePasswordSuccessAction, (state: UpdatePasswordState) => ({
    ...state,
    working: false,
    completed: true,
    message: ''
  })),
  on(actions.updatePasswordErrorAction, (state: UpdatePasswordState) => ({
    ...state,
    working: false,
    completed: false
  })),
  on(actions.resetUpdatePasswordAction, (state: UpdatePasswordState) => ({
    ...initialUpdatePasswordState
  }))
);

export const updatePasswordReducer = (
  state: UpdatePasswordState,
  action: Action
): UpdatePasswordState => {
  return featureReducer(state, action);
};
