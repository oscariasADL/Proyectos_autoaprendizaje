import { ToastProperties } from '@commons/entities/toast/toast.entities';
import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import {
  NotificationItem,
  NotificationPayload,
  NotificationResponse
} from '@commons/entities/notifications/notification.entities';
import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { TransfiyaPayload } from '@modules/transfers/entities/transfers.interface';
import { createAction, props } from '@ngrx/store';
import {
  CustomFactsOfPushNotification,
  PushNotificationApprovalPayload,
  PushNotificationRejectPayload
} from '@app/modules/notifications/entities/push-notification.interface';
import { PushNotificationChannelEnum } from '@app/modules/notifications/constanst/notification.constants';

export const fetchNotificationsIfNecessaryAction = createAction(
  type('[Global/API] Fetch notifications if necessary')
);

export const fetchNotificationsAction = createAction(
  type('[Global/API] Fetch notifications')
);

export const fetchNotificationsSuccessAction = createAction(
  type('[Global/API] Fetch notifications success'),
  props<{ response: NotificationResponse }>()
);

export const fetchNotificationsErrorAction = createAction(
  type('[Global/API] Fetch notifications error'),
  props<{ message: string }>()
);

export const fetchNotificationItemAction = createAction(
  type('[Global/API] Fetch notification item'),
  props<{ payload: NotificationPayload }>()
);

export const fetchNotificationItemSuccessAction = createAction(
  type('[Global/API] Fetch notification item success'),
  props<{ response: NotificationResponse }>()
);

export const fetchNotificationItemErrorAction = createAction(
  type('[Global/API] Fetch notification item error'),
  props<{ message: string }>()
);

export const setReadNotificationsListAction = createAction(
  type('[Global/UI] Set read notifications list'),
  props<{ readList: string }>()
);

export const setDeletedNotificationsListAction = createAction(
  type('[Global/UI] Set deleted notifications list'),
  props<{ deletedList: string }>()
);

export const fetchTransfiyaAuthorizationsIfNecessaryAction = createAction(
  type('[Global/API] Fetch transfiya authorizations if necessary')
);

export const fetchTransfiyaAuthorizationsAction = createAction(
  type('[Global/API] Fetch transfiya authorizations')
);

export const fetchTransfiyaConsignmentsAction = createAction(
  type('[Global/API] Fetch transfiya Consignments')
);

export const fetchTransfiyaConsignmentsSuccessAction = createAction(
  type('[Global/API] Fetch transfiya Consignments success'),
  props<{ items: TransfiyaAuthorizationItem[] }>()
);

export const fetchTransfiyaRequestsAction = createAction(
  type('[Global/API] Fetch transfiya requests')
);

export const fetchTransfiyaRequestsSuccessAction = createAction(
  type('[Global/API] Fetch transfiya requests success'),
  props<{ items: TransfiyaAuthorizationItem[] }>()
);

export const fetchTransfiyaErrorAction = createAction(
  type('[Global/API] Fetch transfiya error'),
  props<{ message: string }>()
);

export const acceptTransfiyaAuthorizationAction = createAction(
  type('[Global/API] Accept transfiya authorization'),
  props<{
    payload: TransfiyaPayload;
    data: AlertStepData;
    isRequest: boolean;
  }>()
);

export const acceptTransfiyaAuthorizationSuccessAction = createAction(
  type('[Global/API] Accept transfiya authorization success'),
  props<{ props: AlertSheetProperties }>()
);

export const acceptTransfiyaAuthorizationErrorAction = createAction(
  type('[Global/API] Accept transfiya authorization error'),
  props<{ props: AlertSheetProperties }>()
);

export const rejectTransfiyaAuthorizationAction = createAction(
  type('[Global/API] Transfiya reject'),
  props<{
    payload: TransfiyaPayload;
    data: AlertStepData;
    isRequest: boolean;
  }>()
);

export const rejectTransfiyaAuthorizationSuccessAction = createAction(
  type('[Global/API] Transfiya reject success'),
  props<{ props: ToastProperties }>()
);

export const rejectTransfiyaAuthorizationErrorAction = createAction(
  type('[Global/API] Transfiya reject error'),
  props<{ props: AlertSheetProperties }>()
);

export const removeByIdTransfiyaAuthorizationAction = createAction(
  type('[Global/API] Transfiya remove by id'),
  props<{ transactionId: string }>()
);

export const updateLastTransactionDateAction = createAction(
  type('[Global/API] Update last transaction date'),
  props<{ lastTransactionDate: string }>()
);

export const fetchPushNotificationItemAction = createAction(
  type('[Global/API] Fetch push notification item'),
  props<{ payload: NotificationPayload }>()
);

export const fetchPushNotificationItemSuccessAction = createAction(
  type('[Global/API] Fetch push notification was successful'),
  props<{ response: NotificationResponse }>()
);

export const fetchPushNotificationItemErrorAction = createAction(
  type('[Global/API] Fetch push notification failed'),
  props<{ message: string }>()
);

export const approvePushNotification = createAction(
  type('[Global/API] Approve push notification'),
  props<{ payload: PushNotificationApprovalPayload }>()
);

export const approvePushNotificationSuccessAction = createAction(
  type('[Global/API] Approval notification was successful'),
  props<{ message: string }>()
);

export const approvePushNotificationErrorAction = createAction(
  type('[Global/API]Approval notification failed'),
  props<{ props: AlertSheetProperties; channel: PushNotificationChannelEnum }>()
);

export const rejectPushNotification = createAction(
  type('[Global/API] Reject push notification'),
  props<{ payload: PushNotificationRejectPayload }>()
);

export const rejectPushNotificationSuccessAction = createAction(
  type('[Global/API] Reject notification was successful'),
  props<{ message: string }>()
);

export const rejectPushNotificationErrorAction = createAction(
  type('[Global/API] Reject notification failed'),
  props<{ message: string }>()
);

export const showNotificationModalAction = createAction(
  type('[Global/API] Show notification modal'),
  props<{
    props: AlertSheetProperties;
    customFacts: CustomFactsOfPushNotification;
    notificationItem: NotificationItem;
  }>()
);
