import { RegisterResponse } from '@modules/auth/register/entities/register.interface';

export const registerFeatureName = 'registerModuleState';

export type RegisterState = Readonly<{
  data: RegisterResponse;
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialRegisterState: RegisterState = {
  data: null,
  working: false,
  completed: false,
  message: ''
};
