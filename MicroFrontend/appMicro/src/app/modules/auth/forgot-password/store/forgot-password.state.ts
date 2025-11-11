import { ForgotPasswordResponse } from '@modules/auth/forgot-password/entities/forgot-password.interface';

export const forgotPasswordFeatureName = 'forgotPasswordModuleState';

export type ForgotPasswordState = Readonly<{
  data: ForgotPasswordResponse;
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialForgotPasswordState: ForgotPasswordState = {
  data: null,
  working: false,
  completed: false,
  message: ''
};
