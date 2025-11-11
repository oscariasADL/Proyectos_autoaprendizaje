import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './generic-stepper.actions';
import {
  initialGenericStepperState,
  GenericStepperState
} from './generic-stepper.state';
import { transferSuccessAction } from '@app/modules/transfers/store/transfers.actions';

const featureReducer = createReducer(
  initialGenericStepperState,
  on(actions.fetchGMFAction, (state: GenericStepperState) => ({
    ...state,
    gmf: null,
    working: true,
    completed: false
  })),
  on(actions.fetchGMFSuccessAction, (state: GenericStepperState, { gmf }) => ({
    ...state,
    gmf,
    working: false,
    completed: true
  })),
  on(
    actions.fetchGMFErrorAction,
    (state: GenericStepperState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  ),
  on(transferSuccessAction, () => initialGenericStepperState)
);

export const genericStepperReducer = (
  state: GenericStepperState,
  action: Action
): GenericStepperState => {
  return featureReducer(state, action);
};
