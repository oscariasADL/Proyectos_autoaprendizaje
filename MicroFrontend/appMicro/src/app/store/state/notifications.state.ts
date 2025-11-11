import { NotificationItem } from '@commons/entities/notifications/notification.entities';
import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';
import { TransfiyaPayload } from '@modules/transfers/entities/transfers.interface';

export type TransfiyaState = Readonly<{
  list: TransfiyaAuthorizationItem[];
  working: boolean;
  completed: boolean;
  loaded: boolean;
}>;

export type NotificationItemState = Readonly<{
  list: NotificationItem[];
  working: boolean;
  completed: boolean;
  loaded: boolean;
  readList: string;
  deletedList: string;
}>;

export type NotificationsState = Readonly<{
  lastTransactionDate: string;
  transfiya: TransfiyaState;
  notifications: NotificationItemState;
  currentPayload: TransfiyaPayload;
}>;

export const initialNotificationsState: NotificationsState = {
  lastTransactionDate: null,
  transfiya: {
    list: [],
    working: false,
    completed: false,
    loaded: false
  },
  notifications: {
    list: [],
    working: false,
    completed: false,
    loaded: false,
    readList: '',
    deletedList: ''
  },
  currentPayload: null
};
