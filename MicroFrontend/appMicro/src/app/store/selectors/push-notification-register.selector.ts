import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PushNotificationRegisterState } from '@store/state/push-notification-register.state';

const pushNotificationRegisterState =
  createFeatureSelector<PushNotificationRegisterState>(
    'pushNotificationRegister'
  );

export const pushNotificationStatusSelector = createSelector(
  pushNotificationRegisterState,
  (state: PushNotificationRegisterState) => state.status
);

export const pushNotificationCompletedSelector = createSelector(
  pushNotificationRegisterState,
  (state: PushNotificationRegisterState) => state.completed
);
