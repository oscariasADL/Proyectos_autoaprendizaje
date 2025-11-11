import { DeviceState } from '@store/state/device.state';
import { InterchangeState } from '@store/state/interchange.state';
import { UserState } from '@store/state/user.state';
import { ConfigState } from './config.state';
import { NotificationsState } from './notifications.state';
import { MailboxState } from './mailbox.state';
import { ParameterState } from './parameter.state';
import { TransfiyaFingerprintState } from '@store/state/transfiya-fingerprint.state';
import { PushNotificationRegisterState } from '@store/state/push-notification-register.state';

export type State = Readonly<{
  parameter: ParameterState;
  config: ConfigState;
  user: UserState;
  device: DeviceState;
  interchange: InterchangeState;
  notifications: NotificationsState;
  mailbox: MailboxState;
  transfiyaFingerprint: TransfiyaFingerprintState;
  pushNotificationRegister: PushNotificationRegisterState;
}>;
