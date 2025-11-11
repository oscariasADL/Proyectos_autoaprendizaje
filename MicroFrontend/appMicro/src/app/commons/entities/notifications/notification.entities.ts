import { NotificationMailboxEnum } from '@app/modules/notifications/constanst/notification.constants';

export interface NotificationPayload {
  deviceId: string;
  documentType: string;
  documentNumber: string;
  id?: string;
}

export interface NotificationResponse {
  content: NotificationItem[];
}

export interface NotificationItem {
  index?: number;
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  isTransaction: boolean;
  qrCode?: string;
  timestamp?: string;
  token?: string;
  txId?: string;
  notificationType: NotificationMailboxEnum;
  reference?: string;
  deleteId?: string;
  userCode?: string;
}

export interface FA2Payload {
  document: string;
  secretQr: string;
  txId: string;
}
export interface FA2PayloadResponse {
  httpCode: string;
  httpMessage: string;
}
