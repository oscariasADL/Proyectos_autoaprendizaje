import { AlertSheetProperties } from '@app/commons/entities/alert/alert-sheet.entities';
import {
  NotificationItem,
  NotificationResponse
} from '@app/commons/entities/notifications/notification.entities';
import { CustomFactsOfPushNotification } from '@app/modules/notifications/entities/push-notification.interface';
import {
  PushNotificationSchema,
  ActionPerformed
} from '@capacitor/push-notifications';
import { type } from '@commons/utils/util';
import { createAction, props } from '@ngrx/store';

export const registerDeviceMailboxAction = createAction(
  type('[Global/API] Register device mailbox')
);

export const registerDeviceMailboxSuccessAction = createAction(
  type('[Global/API] Register device mailbox success'),
  props<{ deviceToken: any }>()
);

export const registerDeviceMailboxErrorAction = createAction(
  type('[Global/API] Register device mailbox error')
);

export const deactivatePushNotificationsAction = createAction(
  type('[Global/API] Deactivate Push Notifications mailbox')
);

export const deactivatePushNotificationsSuccessAction = createAction(
  type('[Global/API] Deactivate Push Notifications Success mailbox')
);

export const deactivatePushNotificationsErrorAction = createAction(
  type('[Global/API] Deactivate Push Notifications error mailbox')
);

export const listenPushNotificationsAction = createAction(
  type('[Global/API] Listen Push Notifications mailbox')
);

/**
 * Show us the notification payload if the app is open on our device
 */
export const pushNotificationReceivedMailboxAction = createAction(
  type('[Global/API] Push Notification Received mailbox'),
  props<{ notification: PushNotificationSchema }>()
);

/**
 * Method called when tapping on a notification
 */
export const pushNotificationActionPerformedMailboxAction = createAction(
  type('[Global/API] Push Notification Action Performed mailbox'),
  props<{ notification: ActionPerformed }>()
);

export const pushNotificationSavedAction = createAction(
  type('[Global/API] Push Notification saved'),
  props<{ notification: any }>()
);

export const pushNotificationDetailSuccessAction = createAction(
  type('[Global/API] Push notification detail success'),
  props<{ response: NotificationResponse }>()
);

export const pushNotificationDetailErrorAction = createAction(
  type('[Global/API] Push notification detail error'),
  props<{ message: string }>()
);

export const showNotificationModalAction = createAction(
  type('[Global/API] Show notification modal'),
  props<{
    props: AlertSheetProperties;
    customFacts: CustomFactsOfPushNotification;
    encryptedNotification: string;
    notificationItem: NotificationItem;
  }>()
);
