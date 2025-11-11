import { StepEnrollmentType } from '@modules/auth/register/entities/register.interface';

export const REGISTER_FLOW_ENDS = [
  StepEnrollmentType.SERVICE_ERROR,
  StepEnrollmentType.CANNOT_REGISTER_DEVICE,
  StepEnrollmentType.CANNOT_GENERATE_SECURE_DATA,
  StepEnrollmentType.USER_MUST_BE_SENT_TO_OFFICE,
  StepEnrollmentType.USER_DOES_NOT_HAVE_SECURE_DATA,
  StepEnrollmentType.RETRIES_LIMIT_EXCEED_ON_SECURE_DATA_SUBMIT,
  StepEnrollmentType.RETRIES_LIMIT_EXCEED_OTP_VALIDATION
];

export const REGISTER_FLOW_ENDS_BANK = [
  StepEnrollmentType.CANNOT_GENERATE_SECURE_DATA,
  StepEnrollmentType.USER_MUST_BE_SENT_TO_OFFICE,
  StepEnrollmentType.USER_DOES_NOT_HAVE_SECURE_DATA,
  StepEnrollmentType.RETRIES_LIMIT_EXCEED_ON_SECURE_DATA_SUBMIT,
  StepEnrollmentType.RETRIES_LIMIT_EXCEED_OTP_VALIDATION
];

export const REGISTER_FLOW_COMPLETED = [
  StepEnrollmentType.COMPLETED,
  StepEnrollmentType.REDIRECT_TO_LOGIN
];

export const REGISTER_FLOW_ONESPAN = [
  StepEnrollmentType.ONESPAN_ACTIVATE_LICENSE,
  StepEnrollmentType.ONESPAN_ACTIVATE_INSTANCE
];
