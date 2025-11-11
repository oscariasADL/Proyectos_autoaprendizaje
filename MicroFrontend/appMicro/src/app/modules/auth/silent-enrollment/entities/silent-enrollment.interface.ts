import { AuthStepResponse } from '@modules/auth/auth-steps/entities/auth-steps.interface';

export interface SilentEnrollmentPayload {
  processId?: string;
  content?: {
    idType?: string;
    id?: string;
    companyId?: string;
    ipAddress?: string;
    deviceOS?: string;
    deviceName?: string;
    deviceSerial?: string;
    isOtpGeneratedByOtherChannel?: string;
    secureDataSecret?: string;
    otpValue?: string;
    forceOtpGeneration?: string;
    universalPassword?: string;
    startProductValidation?: boolean;
    deviceModel?: string;
    devicePlatform?: string;
    deviceUuid?: string;
    deviceAppVersion?: string;
    deviceAppBuild?: string;
    deviceOperatingSystem?: string;
    deviceOsVersion?: string;
    deviceManufacturer?: string;
    isVirtual?: boolean;
    isComplementaryServices?: boolean;
    currentPassword?: string;
  };
}

export type SilentEnrollmentResponse = AuthStepResponse;

export enum StepSilentEnrollmentType {
  FILL_USER_ID = 'MIG01',
  USER_MUST_BE_SENT_TO_OFFICE = 'MIG02',
  USER_DOES_NOT_EXISTS = 'MIG03',
  USER_DOES_NOT_HAVE_SECURE_DATA = 'MIG04',
  FILL_CURRENT_CHANNEL_PASSWORD = 'MIG05',
  CANNOT_REGISTER_DEVICE = 'MIG07',
  COMPLETED = 'MIG08',
  USER_DOES_NOT_EXISTS_ON_SDS = 'MIG09',
  INACTIVE_CHANNEL = 'MIG10',
  CONFIRM_USER_PERMISSIONS = 'MIG11'
}
