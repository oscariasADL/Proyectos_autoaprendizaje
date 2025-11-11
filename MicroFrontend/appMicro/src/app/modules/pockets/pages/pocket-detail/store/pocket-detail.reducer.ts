import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './pocket-detail.actions';
import {
  initialPocketDetailState,
  PocketDetailState
} from './pocket-detail.state';

const featureReducer = createReducer(
  initialPocketDetailState,
  on(actions.fetchPocketDetailAction, (state: PocketDetailState) => ({
    ...state,
    pocket: null,
    working: true,
    completed: false
  })),
  on(
    actions.fetchPocketDetailSuccessAction,
    (state: PocketDetailState, { pocket }) => ({
      ...state,
      pocket,
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchPocketDetailErrorAction,
    (state: PocketDetailState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  )
);

export const pocketDetailReducer = (
  state: PocketDetailState,
  action: Action
): PocketDetailState => {
  return featureReducer(state, action);
};
