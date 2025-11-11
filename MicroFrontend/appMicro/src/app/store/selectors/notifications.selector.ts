import { NOTIFICATION_TRANSACTION_FIELD } from '@commons/constants/notification.constants';
import { NotificationItem } from '@commons/entities/notifications/notification.entities';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationsState } from '../state/notifications.state';

const notificationsState =
  createFeatureSelector<NotificationsState>('notifications');

export const transfiyaNotificationsByIdSelector = () =>
  createSelector(
    notificationsState,
    ({ transfiya }: NotificationsState, id: number) => {
      if (isNullOrUndefined(transfiya.list)) {
        return null;
      }
      return transfiya.list.find(
        (item) => item.transactionId.toString() === id.toString()
      );
    }
  );

function mapNotificationsList(
  notificationsList: NotificationItem[],
  deletedList: string = '',
  readList: string = ''
): NotificationItem[] {
  const arrayDeletedList = deletedList.split(',');
  const arrayReadList = readList.split(',');

  if (isNullOrUndefined(notificationsList)) {
    return [];
  }

  return notificationsList
    .filter((notification) => !arrayDeletedList.includes(notification.id))
    .map((notification) => ({
      ...notification,
      read: arrayReadList.includes(notification.id),
      isTransaction: notification?.isTransaction
        ? notification?.isTransaction
        : notification.title.toLocaleLowerCase() ===
          NOTIFICATION_TRANSACTION_FIELD
    }));
}

export const transfiyaListSelector = createSelector(
  notificationsState,
  (state: NotificationsState) => state.transfiya.list
);

export const transfiyaLoadedSelector = createSelector(
  notificationsState,
  (state: NotificationsState) => state.transfiya.loaded
);

export const notificationsListWithoutFilteredSelector = createSelector(
  notificationsState,
  (state: NotificationsState) => state.notifications.list
);

export const notificationsLoadedSelector = createSelector(
  notificationsState,
  (state: NotificationsState) => state.notifications.loaded
);

export const notificationsDeletedListSelector = createSelector(
  notificationsState,
  (state: NotificationsState) => state.notifications.deletedList
);

export const notificationsReadListSelector = createSelector(
  notificationsState,
  (state: NotificationsState) => state.notifications.readList
);

export const workingNotificationsSelector = createSelector(
  notificationsState,
  (state: NotificationsState) =>
    state.transfiya.working || state.notifications.working
);

export const currentPayloadSelector = createSelector(
  notificationsState,
  (state: NotificationsState) => state?.currentPayload
);

export const notificationsListSelector = createSelector(
  notificationsListWithoutFilteredSelector,
  notificationsDeletedListSelector,
  notificationsReadListSelector,
  mapNotificationsList
);
