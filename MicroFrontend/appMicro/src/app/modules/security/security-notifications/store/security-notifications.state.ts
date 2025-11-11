import {
  SecurityNotificationsStep,
  ToggleSecurityNotificationsResponse
} from '@modules/security/security-notifications/entities/security-notifications.interface';

export const securityNotificationsFeatureName =
  'securityNotificationsModuleState';

export type SecurityNotificationsState = Readonly<{
  working: boolean;
  completed: boolean;
  step: SecurityNotificationsStep;
  response: ToggleSecurityNotificationsResponse;
}>;

export const initialSecurityNotificationsState: SecurityNotificationsState = {
  working: false,
  completed: false,
  step: SecurityNotificationsStep.confirm,
  response: null
};
