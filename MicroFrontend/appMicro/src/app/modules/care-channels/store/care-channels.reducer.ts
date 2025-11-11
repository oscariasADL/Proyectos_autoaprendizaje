import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './care-channels.action';
import {
  initialCarechannelsState,
  CarechannelsState
} from './care-channels.state';

const featureReducer = createReducer(
  initialCarechannelsState,
  on(actions.fetchAdviserAction, (state) => ({
    ...state,
    working: true,
    completed: false
  })),
  on(actions.fetchAdviserSuccessAction, (state, { adviser }) => ({
    ...state,
    adviser,
    working: false,
    completed: true
  })),
  on(actions.fetchAdviserErrorAction, (state) => ({
    ...state,
    working: false,
    completed: false
  }))
);

export function carechannelsReducer(
  state: CarechannelsState | undefined,
  action: Action
): any {
  return featureReducer(state, action);
}
