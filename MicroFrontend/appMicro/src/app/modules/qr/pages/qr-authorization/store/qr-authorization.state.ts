import { FA2PayloadResponse } from '@app/commons/entities/notifications/notification.entities';

export const QRAuthorizationModuleName = 'qrAuthorizationModuleState';

export type QrAuthorizationState = Readonly<{
  transactionTitle: string;
  decryptedData: Record<string, string>;
  dynamicCode: string;
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialQrAuthorizationState: QrAuthorizationState = {
  transactionTitle: null,
  decryptedData: null,
  dynamicCode: null,
  working: false,
  completed: false,
  message: null
};
