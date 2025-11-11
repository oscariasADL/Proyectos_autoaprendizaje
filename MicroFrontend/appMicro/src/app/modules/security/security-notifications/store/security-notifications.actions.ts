import { type } from '@commons/utils/util';
import {
  SecurityNotificationsStep,
  ToggleSecurityNotificationsPayload,
  ToggleSecurityNotificationsResponse
} from '@modules/security/security-notifications/entities/security-notifications.interface';
import { createAction, props } from '@ngrx/store';

export const setSecurityNotificationsStepAction = createAction(
  type('[Global/UI] Set security notifications step'),
  props<{ step: SecurityNotificationsStep }>()
);

export const toggleSecurityNotificationsAction = createAction(
  type('[Global/API] Toggle security notifications'),
  props<{ payload: ToggleSecurityNotificationsPayload }>()
);

export const toggleSecurityNotificationsSuccessAction = createAction(
  type('[Global/API] Toggle security notifications success'),
  props<{ response: ToggleSecurityNotificationsResponse }>()
);

export const toggleSecurityNotificationsErrorAction = createAction(
  type('[Global/API] Toggle security notifications error'),
  props<{ response: ToggleSecurityNotificationsResponse }>()
);
