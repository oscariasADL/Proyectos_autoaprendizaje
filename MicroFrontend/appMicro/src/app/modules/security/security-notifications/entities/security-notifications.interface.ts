export enum SecurityNotificationsStep {
  confirm = 'confirm',
  result = 'result'
}

export enum SecurityNotificationsType {
  ENABLE = 'ENABLE',
  DISABLE = 'DISABLE'
}

export interface ToggleSecurityNotificationsPayload {
  action: SecurityNotificationsType;
  token?: string;
  type?: string;
  brand?: string;
  serial?: string;
  osDevice?: string;
  osVersion?: string;
  spName?: string;
}

export interface ToggleSecurityNotificationsResponse {
  icon: string;
  title: string;
  subtitle?: string;
}
