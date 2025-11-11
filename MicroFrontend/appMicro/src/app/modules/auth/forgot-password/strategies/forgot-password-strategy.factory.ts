import { NavController } from '@ionic/angular';
import { ForgotPasswordStrategy } from './forgot-password-strategy.interface';
import { BiometricsForgotPasswordStrategy } from './biometrics-forgot-password.strategy';
import { StandardForgotPasswordStrategy } from './standard-forgot-password.strategy';

export class ForgotPasswordStrategyFactory {
  public static create(isBiometricsEnabled: boolean): ForgotPasswordStrategy {
    return isBiometricsEnabled
      ? new BiometricsForgotPasswordStrategy()
      : new StandardForgotPasswordStrategy();
  }
}
