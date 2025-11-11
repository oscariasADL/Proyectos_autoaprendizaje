export const LEGAL_NAME = 'BM';

export const BIOMETRICS_TOPICS = {
  BIOMETRIC_DATA: 'BiometricData',
  OUTPUT_RESPONSE: 'OutputResponse',
  OUTPUT_RESPONSE_OVERFLOW: 'OutputResponseOverflow'
};

export const BIOMETRICS_MICROFRONTEND_EVENTS = {
  error: 'errorBiometricsCreation',
  success: 'successBiometricsCreation',
  exit: 'exitBiometrics',
  redirectToHomeEvent: 'redirectToHomeEvent'
};

export enum BiometricsActions {
  RESPONSE_DATA_FROM_MICROFRONTEND_BIOMETRICS = 'Respuesta del flujo de biometria facial',
  EXIT_FROM_MICROFRONTEND_BIOMETRICS = 'Abandono la  biometria facial',
  REDIRECT_TO_HOME_EVENT = 'Redireccion a la home'
}

export const BIOMETRIC_MESSAGES_BY_CODE: Record<string, string> = {
  SA02: 'El cliente ha sido verificado exitosamente',
  SA01: 'El cliente ha sido enrolado exitosamente',
  UNKNOWN: 'Código desconocido'
};

export enum DOCUMENTS_TYPE_BY_BIOMETRICS {
  CC = '1',
  CE = '4',
  TI = '5',
  PPT = '17'
}

export enum BIOMETRIC_VERIFICATION_STATUS {
  SUCCESS = 'SATISFACTORIO',
  ERROR = 'NO SATISFACTORIO'
}

export const BIOMETRIC_FAILURE_TITLE_FOR_FORGOT_PASSWORD =
  'AUTH.STEP.BIOMETRIC_VERIFICATION_FAILED.FORGOT_PASSWORD_TITLE';

export const BIOMETRIC_FAILURE_TITLE_FOR_REGISTER =
  'AUTH.STEP.BIOMETRIC_VERIFICATION_FAILED.REGISTER_TITLE';
