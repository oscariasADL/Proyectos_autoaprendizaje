import {
  AuthStepPayload,
  AuthStepResponse
} from '@modules/auth/auth-steps/entities/auth-steps.interface';
import {
  AlertComponentType,
  AlertSheetIcon,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export type RegisterPayload = AuthStepPayload;
export type RegisterResponse = AuthStepResponse;

export enum StepEnrollmentType {
  FILL_USER_ID = 'ENR01',
  USER_MUST_BE_SENT_TO_OFFICE = 'ENR02',
  USER_DOES_NOT_EXISTS = 'ENR03',
  USER_DOES_NOT_HAVE_SECURE_DATA = 'ENR04',
  FILL_CURRENT_CHANNEL_PASSWORD = 'ENR05',
  CONFIRM_DEVICE_REGISTRATION = 'ENR06',
  RETRIES_LIMIT_EXCEED_ON_SECURE_DATA_SUBMIT = 'ENR07',
  FILL_SECURE_DATA = 'ENR08',
  CANNOT_GENERATE_SECURE_DATA = 'ENR09',
  REQUEST_INPUT_OTP_FROM_ANOTHER_CHANNEL = 'ENR10',
  RETRIES_LIMIT_EXCEED_OTP_VALIDATION = 'ENR11',
  TEMPORARILY_BLOCKED_USER = 'ENR12',
  FILL_OTP_DATA = 'ENR13',
  FILL_NEW_UNIVERSAL_PASSWORD = 'ENR14',
  CANNOT_REGISTER_DEVICE = 'ENR15',
  REDIRECT_TO_LOGIN = 'ENR16',
  COMPLETED = 'ENR17',
  INACTIVE_CHANNEL = 'ENR18',
  ONESPAN_ACTIVATE_INSTANCE = 'ENR19',
  ONESPAN_ACTIVATE_LICENSE = 'ENR20',
  CONFIRM_USER_PERMISSIONS = 'ENR21',
  SELECT_PRODUCT_TYPE = 'ENR22',
  SERVICE_ERROR = 'SERVICE ERROR',
  BIOMETRIC_VERIFICATION = 'ENR25'
}

export const ALERT_USER_NOT_EXISTS_ERROR = {
  id: 'alert-user-not-exits-error',
  type: AlertSheetType.error,
  componentType: AlertComponentType.alertSheet,
  icon: AlertSheetIcon.error,
  title: 'AUTH.REGISTER.ERROR.DEFAULT',
  buttons: ['Entendido']
};
