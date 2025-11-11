import { deviceReducer as device } from '@store/reducers/device.reducer';
import { interchangeReducer as interchange } from '@store/reducers/interchange.reducer';
import { userReducer as user } from '@store/reducers/user.reducer';
import { configReducer as config } from './config.reducer';
import { mailboxReducer as mailbox } from './mailbox.reducer';
import { notificationsReducer as notifications } from './notifications.reducer';
import { parameterReducer as parameter } from './parameter.reducer';
import { transfiyaFingerprintReducer as transfiyaFingerprint } from '@store/reducers/transfiya-fingerprint.reducer';
import { pushNotificationRegisterReducer as pushNotificationRegister } from '@store/reducers/push-notification-register.reducer';

export const globalReducers = {
  parameter,
  config,
  user,
  device,
  interchange,
  notifications,
  mailbox,
  transfiyaFingerprint,
  pushNotificationRegister
};
