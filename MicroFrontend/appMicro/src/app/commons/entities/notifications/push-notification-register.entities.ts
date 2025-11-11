export enum TogglePushNotificationsType {
  ENABLE = 'ENABLE',
  DISABLE = 'DISABLE'
}

export interface PushNotificationRegisterPayload {
  action: TogglePushNotificationsType;
  token?: string;
  type?: string;
  brand?: string;
  serial?: string;
  osDevice?: string;
  osVersion?: string;
  spName?: string;
}
