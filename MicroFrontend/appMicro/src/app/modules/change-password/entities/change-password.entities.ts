export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmedPassword: string;
}

export enum ChangePasswordScreenType {
  currentPassword = 'currentPassword',
  newPassword = 'newPassword',
  completed = 'Completed'
}
