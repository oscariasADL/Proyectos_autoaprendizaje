import { USER_IDLE_CONFIGURATION } from '@commons/constants/user-idle.constants';
import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/config.action';
import { ConfigState, initialConfigState } from '../state/config.state';

const featureReducer = createReducer(
  initialConfigState,
  on(actions.fetchConfigAction, (state: ConfigState) => ({
    ...state,
    working: true,
    completed: false,
    message: ''
  })),
  on(actions.fetchConfigSuccessAction, (state: ConfigState, { config }) => ({
    ...state,
    config: {
      pingTime: USER_IDLE_CONFIGURATION.ping,
      idleTime: USER_IDLE_CONFIGURATION.idle,
      timeout: USER_IDLE_CONFIGURATION.timeout,
      ...config
    },
    working: false,
    completed: true,
    message: ''
  })),
  on(actions.fetchConfigErrorAction, (state: ConfigState, { message }) => ({
    ...state,
    config: {
      pingTime: USER_IDLE_CONFIGURATION.ping,
      idleTime: USER_IDLE_CONFIGURATION.idle,
      timeout: USER_IDLE_CONFIGURATION.timeout,
      date: new Date().toISOString()
    },
    working: false,
    completed: false,
    message
  })),
  on(actions.appLoadedAction, (state: ConfigState) => ({
    ...state,
    appLoaded: true
  }))
);

export const configReducer = (
  state: ConfigState,
  action: Action
): ConfigState => {
  return featureReducer(state, action);
};
