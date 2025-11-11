import { SecurityBiometricStep } from '@modules/security/security-biometrics/entities/security-biometrics.interface';

export const securityBiometricsFeatureName = 'securityBiometricsModuleState';

export type SecurityBiometricsState = Readonly<{
  step: SecurityBiometricStep;
}>;

export const initialSecurityBiometrics: SecurityBiometricsState = {
  step: SecurityBiometricStep.question
};
