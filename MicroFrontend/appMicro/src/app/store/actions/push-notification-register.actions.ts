import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import {
  PushNotificationRegisterPayload,
  TogglePushNotificationsType
} from '@commons/entities/notifications/push-notification-register.entities';

export const togglePushNotificationsAction = createAction(
  type('[PushNotificationRegister] Toggle Push Notifications'),
  props<{ action: TogglePushNotificationsType; updateProvider: boolean }>()
);

export const togglePushNotificationsSuccessAction = createAction(
  type('[PushNotificationRegister] Toggle Push Notifications Success'),
  props<{
    action: TogglePushNotificationsType;
    deviceToken: string | null;
    status: boolean;
  }>()
);

export const togglePushNotificationsPermissionErrorAction = createAction(
  type('[PushNotificationRegister] Toggle Push Notifications Permission Error'),
  props<{ error: any; action: TogglePushNotificationsType }>()
);

export const togglePushNotificationsErrorAction = createAction(
  type('[PushNotificationRegister] Toggle Push Notifications Failure'),
  props<{ error: any; action: TogglePushNotificationsType }>()
);

export const setPushNotificationsStatusAction = createAction(
  type('[PushNotificationRegister] Set Push notifications status'),
  props<{ status: boolean }>()
);

export const notifyProviderPushNotificationToggleAction = createAction(
  type('[PushNotificationRegister] notify provider push notification toggle'),
  props<{ payload: PushNotificationRegisterPayload }>()
);

export const notifyProviderPushNotificationToggleSuccessAction = createAction(
  type(
    '[PushNotificationRegister] notify provider push notification toggle success'
  ),
  props<{ action: TogglePushNotificationsType; status: boolean }>()
);

export const notifyProviderPushNotificationToggleErrorAction = createAction(
  type(
    '[PushNotificationRegister] notify provider push notification toggle failure'
  ),
  props<{ error: any; action: TogglePushNotificationsType; status: boolean }>()
);
