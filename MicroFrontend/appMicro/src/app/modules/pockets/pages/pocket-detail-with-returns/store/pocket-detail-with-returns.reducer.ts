import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './pocket-detail-with-returns.actions';
import {
  initialPocketDetailWithReturnsState,
  PocketDetailWithReturnsState
} from './pocket-detail-with-returns.state';

const featureReducer = createReducer(
  initialPocketDetailWithReturnsState,
  on(
    actions.fetchPocketWithReturnsDetailAction,
    (state: PocketDetailWithReturnsState) => ({
      ...state,
      pocket: null,
      working: true,
      completed: false
    })
  ),
  on(
    actions.fetchPocketDetailWithReturnsSuccessAction,
    (state: PocketDetailWithReturnsState, { pocket }) => ({
      ...state,
      pocket,
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchPocketDetailWithReturnsErrorAction,
    (state: PocketDetailWithReturnsState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  ),
  on(
    actions.fetchPocketWithReturnsMovementsAction,
    (state: PocketDetailWithReturnsState) => ({
      ...state,
      movements: [],
      workingMovements: true,
      completedMovements: false
    })
  ),
  on(
    actions.fetchPocketWithReturnsMovementsSuccessAction,
    (state: PocketDetailWithReturnsState, { movements }) => ({
      ...state,
      movements,
      workingMovements: false,
      completedMovements: true
    })
  ),
  on(
    actions.fetchPocketWithReturnsMovementsErrorAction,
    (state: PocketDetailWithReturnsState, { message }) => ({
      ...state,
      workingMovements: false,
      completedMovements: false,
      message
    })
  )
);

export const pocketDetailWithReturnsReducer = (
  state: PocketDetailWithReturnsState,
  action: Action
): PocketDetailWithReturnsState => {
  return featureReducer(state, action);
};
