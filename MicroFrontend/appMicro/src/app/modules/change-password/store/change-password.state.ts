export const changePasswordFeatureName = 'changePasswordModuleState';

export type ChangePasswordState = Readonly<{
  working: boolean;
  completed: boolean;
  message: string;
  errorCode: string;
}>;

export const initialChangePasswordState: ChangePasswordState = {
  working: false,
  completed: false,
  message: '',
  errorCode: ''
};
