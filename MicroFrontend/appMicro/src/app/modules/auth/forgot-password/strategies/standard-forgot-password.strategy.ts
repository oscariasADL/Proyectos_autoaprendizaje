import { StepForgotPasswordType } from '../entities/forgot-password.interface';
import { ForgotPasswordStrategy } from './forgot-password-strategy.interface';

export class StandardForgotPasswordStrategy implements ForgotPasswordStrategy {
  public getStepEnum() {
    return StepForgotPasswordType;
  }
}
