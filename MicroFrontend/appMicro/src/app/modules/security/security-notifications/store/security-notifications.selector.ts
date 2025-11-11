import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  securityNotificationsFeatureName,
  SecurityNotificationsState
} from './security-notifications.state';

const securityNotificationsState =
  createFeatureSelector<SecurityNotificationsState>(
    securityNotificationsFeatureName
  );

export const securityNotificationsStepSelector = createSelector(
  securityNotificationsState,
  (state: SecurityNotificationsState) => state?.step
);

export const securityNotificationsWorkingSelector = createSelector(
  securityNotificationsState,
  (state: SecurityNotificationsState) => state.working
);

export const securityNotificationsCompletedSelector = createSelector(
  securityNotificationsState,
  (state: SecurityNotificationsState) => state.completed
);

export const securityNotificationsResponseSelector = createSelector(
  securityNotificationsState,
  (state: SecurityNotificationsState) => state.response
);
