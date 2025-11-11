import {
  StepForgotPasswordType,
  StepForgotPasswordTypeWithBiometrics
} from '../entities/forgot-password.interface';

export interface ForgotPasswordStrategy {
  getStepEnum(): StepEnumType;
}

export type StepEnumType =
  | typeof StepForgotPasswordType
  | typeof StepForgotPasswordTypeWithBiometrics;
