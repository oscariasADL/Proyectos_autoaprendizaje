import {
  AuthStepPayload,
  AuthStepResponse
} from '@modules/auth/auth-steps/entities/auth-steps.interface';

export enum ComplementaryServicesStep {
  info = 'info',
  otp = 'otp',
  question = 'question',
  requestInfo = 'requestInfo',
  complete = 'complete',
  failed = 'failed'
}

export enum ComplementaryServicesType {
  ENABLE = 'ENABLE',
  DISABLE = 'DISABLE'
}

/*export interface ToggleComplementaryServicesPayload {
  action: ComplementaryServicesType;
  otp?: string;
}*/

export interface ToggleComplementaryServicesPayload extends AuthStepPayload {
  content: AuthStepPayload['content'] & {
    automaticValidation?: boolean;
    turnOn?: boolean;
  };
}

export interface ToggleComplementaryServicesResponse extends AuthStepResponse {
  complementary: boolean;
}

export enum StepSeedSowingType {
  ONESPAN_ACTIVATE_LICENSE = 'CCS01',
  ONESPAN_ACTIVATE_INSTANCE = 'CCS02',
  COMPLETED = 'CCS03',
  ALREADY_HAS_SEED = 'CCS04',
  FAILED_ACTIVATION = 'CCS05',
  FILL_OTP_DATA = 'CCS06',
  RETRIES_LIMIT_EXCEED_OTP_VALIDATION = 'CCS07',
  AUTO_MIGRATION_OFF = 'CCS08'
}
