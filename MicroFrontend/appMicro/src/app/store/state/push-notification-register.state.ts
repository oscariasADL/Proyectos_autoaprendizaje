export type PushNotificationRegisterState = Readonly<{
  deviceToken: string;
  status: boolean;
  permissionsGranted: boolean;
  working: boolean;
  completed: boolean;
  error?: string;
}>;

export const initialPushNotificationRegister: PushNotificationRegisterState = {
  deviceToken: undefined,
  status: true,
  permissionsGranted: true,
  working: false,
  completed: false
};
