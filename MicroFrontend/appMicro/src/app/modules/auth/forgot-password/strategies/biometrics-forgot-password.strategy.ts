import { StepForgotPasswordTypeWithBiometrics } from '../entities/forgot-password.interface';
import { ForgotPasswordStrategy } from './forgot-password-strategy.interface';

export class BiometricsForgotPasswordStrategy
  implements ForgotPasswordStrategy
{
  public getStepEnum() {
    return StepForgotPasswordTypeWithBiometrics;
  }
}
