import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/push-notification-register.actions';
import {
  PushNotificationRegisterState,
  initialPushNotificationRegister
} from '../state/push-notification-register.state';

const featurePushNotificationRegisterReducer = createReducer(
  initialPushNotificationRegister,
  on(actions.togglePushNotificationsAction, (state) => ({
    ...state,
    working: true,
    completed: false,
    error: null
  })),
  on(actions.togglePushNotificationsPermissionErrorAction, (state, action) => ({
    ...state,
    permissionsGranted: false,
    working: false,
    completed: true,
    error: action.error
  })),
  on(
    actions.togglePushNotificationsSuccessAction,
    (state, { status, deviceToken }) => ({
      ...state,
      status,
      deviceToken,
      permissionsGranted: true,
      working: false,
      completed: true,
      error: null
    })
  ),
  on(actions.togglePushNotificationsErrorAction, (state, action) => ({
    ...state,
    working: false,
    completed: true,
    error: action.error
  })),
  on(actions.setPushNotificationsStatusAction, (state, { status }) => ({
    ...state,
    status
  })),
  on(actions.notifyProviderPushNotificationToggleAction, (state, action) => ({
    ...state,
    working: true,
    completed: false,
    error: null
  })),
  on(
    actions.notifyProviderPushNotificationToggleSuccessAction,
    (state, { status }) => ({
      ...state,
      status,
      working: true,
      completed: false,
      error: null
    })
  ),
  on(
    actions.notifyProviderPushNotificationToggleErrorAction,
    (state, { error, status }) => ({
      ...state,
      status,
      working: false,
      completed: true,
      error
    })
  )
);

export function pushNotificationRegisterReducer(
  state: PushNotificationRegisterState,
  action: Action
): PushNotificationRegisterState {
  return featurePushNotificationRegisterReducer(state, action);
}
