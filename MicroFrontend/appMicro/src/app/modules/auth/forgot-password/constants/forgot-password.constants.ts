import {
  StepForgotPasswordType,
  StepForgotPasswordTypeWithBiometrics
} from '@modules/auth/forgot-password/entities/forgot-password.interface';

export const FORGOT_PASSWORD_FLOW_ENDS = [
  StepForgotPasswordType.SERVICE_ERROR,
  StepForgotPasswordType.CANNOT_REGISTER_DEVICE,
  StepForgotPasswordType.CANNOT_GENERATE_SECURE_DATA,
  StepForgotPasswordType.USER_DOES_NOT_HAVE_SECURE_DATA,
  StepForgotPasswordType.RETRIES_LIMIT_EXCEED_ON_SECURE_DATA_SUBMIT,
  StepForgotPasswordType.RETRIES_LIMIT_EXCEED_ON_OTP_GENERATION_VALIDATION
];

export const FORGOT_PASSWORD_FLOW_ENDS_BANK = [
  StepForgotPasswordType.CANNOT_GENERATE_SECURE_DATA,
  StepForgotPasswordType.USER_MUST_BE_SENT_TO_OFFICE,
  StepForgotPasswordType.USER_DOES_NOT_HAVE_SECURE_DATA,
  StepForgotPasswordType.RETRIES_LIMIT_EXCEED_ON_SECURE_DATA_SUBMIT,
  StepForgotPasswordType.RETRIES_LIMIT_EXCEED_ON_OTP_GENERATION_VALIDATION
];

export const FORGOT_PASSWORD_FLOW_COMPLETED = [
  StepForgotPasswordType.COMPLETED
];

export const FORGOT_PASSWORD_FLOW_ENDS_BIOMETRICS = [
  StepForgotPasswordTypeWithBiometrics.SERVICE_ERROR,
  StepForgotPasswordTypeWithBiometrics.CANNOT_REGISTER_DEVICE,
  StepForgotPasswordTypeWithBiometrics.CANNOT_GENERATE_SECURE_DATA,
  StepForgotPasswordTypeWithBiometrics.USER_DOES_NOT_HAVE_SECURE_DATA,
  StepForgotPasswordTypeWithBiometrics.RETRIES_LIMIT_EXCEED_ON_SECURE_DATA_SUBMIT,
  StepForgotPasswordTypeWithBiometrics.RETRIES_LIMIT_EXCEED_ON_OTP_GENERATION_VALIDATION
];

export const FORGOT_PASSWORD_FLOW_ENDS_BANK_BIOMETRICS = [
  StepForgotPasswordTypeWithBiometrics.CANNOT_GENERATE_SECURE_DATA,
  StepForgotPasswordTypeWithBiometrics.USER_MUST_BE_SENT_TO_OFFICE,
  StepForgotPasswordTypeWithBiometrics.USER_DOES_NOT_HAVE_SECURE_DATA,
  StepForgotPasswordTypeWithBiometrics.RETRIES_LIMIT_EXCEED_ON_SECURE_DATA_SUBMIT,
  StepForgotPasswordTypeWithBiometrics.RETRIES_LIMIT_EXCEED_ON_OTP_GENERATION_VALIDATION
];

export const FORGOT_PASSWORD_FLOW_COMPLETED_BIOMETRICS = [
  StepForgotPasswordTypeWithBiometrics.COMPLETED
];

export const FORGOT_PASSWORD_FLOW_ONESPAN = [
  StepForgotPasswordTypeWithBiometrics.ONESPAN_ACTIVATE_LICENSE,
  StepForgotPasswordTypeWithBiometrics.ONESPAN_ACTIVATE_INSTANCE
];
