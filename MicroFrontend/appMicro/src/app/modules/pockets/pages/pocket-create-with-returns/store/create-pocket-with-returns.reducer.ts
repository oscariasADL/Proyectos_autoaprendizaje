import { Action, createReducer, on } from '@ngrx/store';
import * as createPocketWithReturnsActions from './create-pocket-with-returns.action';
import {
  initialPocketWithReturnsState,
  PocketWithReturnsState
} from './create-pocket-with-returns.state';

const featureReducer = createReducer(
  initialPocketWithReturnsState,
  on(
    createPocketWithReturnsActions.CreatePocketSuccessAction,
    (state: PocketWithReturnsState) => ({
      ...state,
      pocketWithReturnsWorking: false,
      pocketWithReturnsCompleted: true
    })
  ),
  on(
    createPocketWithReturnsActions.CreatePocketErrorAction,
    (state: PocketWithReturnsState) => ({
      ...state,
      pocketWithReturnsWorking: false,
      pocketWithReturnsCompleted: false
    })
  )
);
export const pocketsWithReturnsReducer = (
  state: PocketWithReturnsState,
  action: Action
): PocketWithReturnsState => {
  return featureReducer(state, action);
};
