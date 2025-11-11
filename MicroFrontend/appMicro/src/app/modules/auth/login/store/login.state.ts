import { LoginType } from '@modules/auth/login/constants/login.constants';
import { LoginUserResponse } from '@modules/auth/login/entities/login-user-response.interface';

export const loginFeatureName = 'loginModuleState';

export type LoginState = Readonly<{
  data: LoginUserResponse;
  type: LoginType;
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialLoginState: LoginState = {
  data: null,
  type: null,
  working: false,
  completed: false,
  message: ''
};
