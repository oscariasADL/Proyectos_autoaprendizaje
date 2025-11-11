import { Action, createReducer, on } from '@ngrx/store';

import * as actions from './pocket-movements.actions';
import {
  initialPocketMovementsState,
  PocketMovementsState
} from '@modules/pockets/pages/pocket-movements/store/pocket-movements.state';

const featureReducer = createReducer(
  initialPocketMovementsState,
  on(actions.fetchPocketMovementsAction, (state: PocketMovementsState) => ({
    ...state,
    movements: [],
    working: true,
    completed: false
  })),
  on(
    actions.fetchPocketMovementsSuccessAction,
    (state: PocketMovementsState, { movements }) => ({
      ...state,
      movements,
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchPocketMovementsErrorAction,
    (state: PocketMovementsState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  )
);

export const pocketMovementsReducer = (
  state: PocketMovementsState,
  action: Action
): PocketMovementsState => {
  return featureReducer(state, action);
};
