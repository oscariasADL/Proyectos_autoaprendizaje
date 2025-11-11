import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './pockets-home.actions';
import {
  initialPocketsHomeState,
  PocketsHomeState
} from './pockets-home.state';

const featureReducer = createReducer(
  initialPocketsHomeState,
  on(actions.fetchPocketsAction, (state: PocketsHomeState) => ({
    ...state,
    pockets: null,
    working: true,
    completed: false
  })),
  on(
    actions.fetchPocketsSuccessAction,
    (state: PocketsHomeState, { pockets }) => ({
      ...state,
      pockets,
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchPocketsErrorAction,
    (state: PocketsHomeState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  )
);

export const pocketsHomeReducer = (
  state: PocketsHomeState,
  action: Action
): PocketsHomeState => {
  return featureReducer(state, action);
};
