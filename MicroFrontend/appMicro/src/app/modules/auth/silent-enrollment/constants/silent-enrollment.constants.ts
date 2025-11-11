import { StepSilentEnrollmentType } from '../entities/silent-enrollment.interface';

export const SILENT_ENROLLMENT_FLOW_ENDS = [
  StepSilentEnrollmentType.CANNOT_REGISTER_DEVICE,
  StepSilentEnrollmentType.USER_DOES_NOT_EXISTS_ON_SDS,
  StepSilentEnrollmentType.USER_DOES_NOT_HAVE_SECURE_DATA,
  StepSilentEnrollmentType.USER_MUST_BE_SENT_TO_OFFICE
];

export const SILENT_ENROLLMENT_FLOW_ENDS_BANK = [
  StepSilentEnrollmentType.USER_DOES_NOT_EXISTS_ON_SDS,
  StepSilentEnrollmentType.USER_MUST_BE_SENT_TO_OFFICE,
  StepSilentEnrollmentType.USER_DOES_NOT_HAVE_SECURE_DATA
];
