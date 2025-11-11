import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './silent-enrollment.actions';
import {
  initialSilentEnrollmentState,
  SilentEnrollmentState
} from './silent-enrollment.state';

const featureReducer = createReducer(
  initialSilentEnrollmentState,
  on(actions.runSilentEnrollmentAction, (state: SilentEnrollmentState) => ({
    ...state,
    working: true,
    completed: false,
    message: ''
  })),
  on(
    actions.runSilentEnrollmentSuccessAction,
    (state: SilentEnrollmentState, { data }) => ({
      ...state,
      data,
      working: false,
      completed: true,
      message: ''
    })
  ),
  on(
    actions.runSilentEnrollmentErrorAction,
    (state: SilentEnrollmentState) => ({
      ...state,
      working: false,
      completed: false
    })
  )
);

export const silentEnrollmentReducer = (
  state: SilentEnrollmentState,
  action: Action
): SilentEnrollmentState => {
  return featureReducer(state, action);
};
