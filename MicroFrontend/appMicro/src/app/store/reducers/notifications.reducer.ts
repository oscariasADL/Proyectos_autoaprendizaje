import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/notifications.action';
import {
  initialNotificationsState,
  NotificationsState
} from '../state/notifications.state';

const featureReducer = createReducer(
  initialNotificationsState,
  on(
    actions.fetchTransfiyaAuthorizationsAction,
    (state: NotificationsState) => ({
      ...state,
      transfiya: {
        ...state.transfiya,
        list: [],
        working: true,
        completed: false
      }
    })
  ),
  on(
    actions.fetchTransfiyaConsignmentsSuccessAction,
    actions.fetchTransfiyaRequestsSuccessAction,
    (state: NotificationsState, { items }) => ({
      ...state,
      transfiya: {
        ...state.transfiya,
        list: [...state.transfiya.list, ...items],
        working: false,
        completed: true,
        loaded: true
      }
    })
  ),
  on(
    actions.fetchTransfiyaErrorAction,
    (state: NotificationsState, { message }) => ({
      ...state,
      transfiya: {
        ...state.transfiya,
        working: false,
        completed: false,
        loaded: true
      }
    })
  ),
  on(
    actions.removeByIdTransfiyaAuthorizationAction,
    (state: NotificationsState, { transactionId }) => ({
      ...state,
      transfiya: {
        ...state.transfiya,
        list: [
          ...state.transfiya.list.filter(
            (item) => item.transactionId !== transactionId
          )
        ]
      }
    })
  ),
  on(
    actions.updateLastTransactionDateAction,
    (state: NotificationsState, { lastTransactionDate }) => ({
      ...state,
      lastTransactionDate
    })
  ),
  on(actions.fetchNotificationsAction, (state: NotificationsState) => ({
    ...state,
    notifications: {
      ...state.notifications,
      list: [],
      working: true,
      completed: false
    }
  })),
  on(
    actions.fetchNotificationsSuccessAction,
    (state: NotificationsState, { response }) => ({
      ...state,
      notifications: {
        ...state.notifications,
        list: response?.content,
        working: false,
        completed: true,
        loaded: true
      }
    })
  ),
  on(
    actions.fetchNotificationsErrorAction,
    (state: NotificationsState, { message }) => ({
      ...state,
      notifications: {
        ...state.notifications,
        working: false,
        completed: false,
        loaded: true
      }
    })
  ),
  on(
    actions.fetchNotificationItemAction,
    (state: NotificationsState, { payload }) => ({
      ...state,
      notifications: {
        ...state.notifications,
        list: state.notifications.list.map((notification) => ({
          ...notification,
          read: notification.id === payload.id ? true : notification.read
        }))
      }
    })
  ),
  on(
    actions.setReadNotificationsListAction,
    (state: NotificationsState, { readList }) => ({
      ...state,
      notifications: {
        ...state.notifications,
        readList
      }
    })
  ),
  on(
    actions.setDeletedNotificationsListAction,
    (state: NotificationsState, { deletedList }) => ({
      ...state,
      notifications: {
        ...state.notifications,
        deletedList
      }
    })
  ),
  on(
    actions.acceptTransfiyaAuthorizationAction,
    (state: NotificationsState, { payload, isRequest }) => ({
      ...state,
      currentPayload: !isRequest ? payload : null
    })
  )
);

export const notificationsReducer = (
  state: NotificationsState,
  action: Action
): NotificationsState => {
  return featureReducer(state, action);
};
