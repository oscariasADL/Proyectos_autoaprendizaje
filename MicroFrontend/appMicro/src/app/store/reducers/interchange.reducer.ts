import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '@store/actions/interchange.action';
import {
  initialInterchangeState,
  InterchangeState
} from '@store/state/interchange.state';

const featureReducer = createReducer(
  initialInterchangeState,
  on(actions.initInterchangeKeyAction, (state: InterchangeState) => ({
    ...state,
    working: true,
    completed: false,
    date: null,
    publicKey: null
  })),
  on(
    actions.initInterchangeKeySuccessAction,
    (state: InterchangeState, { publicKey }) => ({
      ...state,
      working: true,
      completed: false,
      date: new Date(),
      publicKey
    })
  ),
  on(actions.interchangeKeyDataSuccessAction, (state: InterchangeState) => ({
    ...state,
    working: false,
    completed: true
  })),
  on(actions.initInterchangeKeyErrorAction, (state: InterchangeState) => ({
    ...state,
    working: false,
    completed: true
  })),
  on(
    actions.setInterchangeKeyTimeoutIdAction,
    (state: InterchangeState, { timeoutId }) => ({
      ...state,
      timeoutId
    })
  )
);

export const interchangeReducer = (
  state: InterchangeState,
  action: Action
): InterchangeState => {
  return featureReducer(state, action);
};
