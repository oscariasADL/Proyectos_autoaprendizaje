import { SecurityNotificationsStep } from '@modules/security/security-notifications/entities/security-notifications.interface';
import * as actions from '@modules/security/security-notifications/store/security-notifications.actions';
import { Action, createReducer, on } from '@ngrx/store';
import {
  initialSecurityNotificationsState,
  SecurityNotificationsState
} from './security-notifications.state';

const featureReducer = createReducer(
  initialSecurityNotificationsState,
  on(
    actions.setSecurityNotificationsStepAction,
    (state: SecurityNotificationsState, { step }) => ({
      ...state,
      step
    })
  ),
  on(
    actions.toggleSecurityNotificationsAction,
    (state: SecurityNotificationsState, { payload }) => ({
      ...state,
      working: true,
      completed: false
    })
  ),
  on(
    actions.toggleSecurityNotificationsSuccessAction,
    (state: SecurityNotificationsState, { response }) => ({
      ...state,
      response,
      working: false,
      completed: true,
      step: SecurityNotificationsStep.result
    })
  ),
  on(
    actions.toggleSecurityNotificationsErrorAction,
    (state: SecurityNotificationsState, { response }) => ({
      ...state,
      response,
      working: false,
      completed: true,
      step: SecurityNotificationsStep.result
    })
  )
);

export const securityNotificationsReducer = (
  state: SecurityNotificationsState,
  action: Action
): SecurityNotificationsState => {
  return featureReducer(state, action);
};
