export interface AuthStepPayload {
  processId?: string;
  content?: {
    idType?: string;
    id?: string;
    companyId?: string;
    ipAddress?: string;
    deviceOS?: string;
    deviceName?: string;
    deviceModel?: string;
    devicePlatform?: string;
    deviceUuid?: string;
    deviceAppVersion?: string;
    deviceAppBuild?: string;
    deviceOperatingSystem?: string;
    deviceOsVersion?: string;
    deviceManufacturer?: string;
    isVirtual?: boolean;
    serial?: string;
    deviceSerial?: string;
    isOtpGeneratedByOtherChannel?: string;
    secureDataSecret?: string;
    otpValue?: string;
    forceOtpGeneration?: string;
    universalPassword?: string;
    startProductValidation?: boolean;
    deviceCode?: string;
    signatureCode?: string;
    selectedProductType?: SecureDataBriefProductType;
    confirmDecisionStartProcess?: boolean;
    mobileLongitude?: string;
    mobileLatitude?: string;
    screenSize?: string;
    isRegister?: boolean;
    biometricProcessId?: string;
    biometricToken?: string;
  };
}

export interface AuthStepResponse {
  processId: string;
  step: string;
  secureDataBriefQuestion: {
    length: number;
    question: string;
    accountType: string;
    questionType: string;
    productType: string;
  };
  token: string;
  lastAuthDate: string;
  currentDate: string;
  userFirstName?: string;
  lastIPAddress: string;
  errorMessage: string;
  errorCode: string;
  sdsPasswordValidation: string;
  challenged: boolean;
  twoFactorAuthResponse: string;
  success: boolean;
  complementary?: boolean;
  enrollmentKey?: string;
  isLastAttempt?: boolean;
  biometricAuthorizer?: string;
}

export enum AuthStepType {
  register = 'register',
  forgotPassword = 'forgotPassword',
  silentEnrollment = 'silentEnrollment'
}

export enum SecureDataBriefProductType {
  DEBIT_CARD = 'DEBIT_CARD',
  CREDIT_CARD = 'CREDIT_CARD'
}
