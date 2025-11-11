export enum BiometricType {
  Finger = 'finger',
  Face = 'face'
}

export enum BiometricResponses {
  BiometricSuccess = 'biometric_success',
  Success = 'success'
}

export enum BiometricErrors {
  BIOMETRIC_UNKNOWN_ERROR = -100,
  BIOMETRIC_UNAVAILABLE = -101,
  BIOMETRIC_AUTHENTICATION_FAILED = -102,
  BIOMETRIC_SDK_NOT_SUPPORTED = -103,
  BIOMETRIC_HARDWARE_NOT_SUPPORTED = -104,
  BIOMETRIC_PERMISSION_NOT_GRANTED = -105,
  BIOMETRIC_NOT_ENROLLED = -106,
  BIOMETRIC_INTERNAL_PLUGIN_ERROR = -107,
  BIOMETRIC_DISMISSED = -108,
  BIOMETRIC_PIN_OR_PATTERN_DISMISSED = -109,
  BIOMETRIC_SCREEN_GUARD_UNSECURED = -110,
  BIOMETRIC_LOCKED_OUT = -111,
  BIOMETRIC_LOCKED_OUT_PERMANENT = -112,
  BIOMETRIC_NO_SECRET_FOUND = -113
}

export const BiometricOptions = {
  [BiometricType.Finger]: {
    title: 'Touch ID para AV Villas',
    description: 'Acerca tu huella al sensor',
    cancelButtonTitle: 'Cancelar',
    invalidateOnEnrollment: true,
    disableBackup: true
  },
  [BiometricType.Face]: {
    title: 'Face ID para AV Villas',
    description: 'Acerca tu rostro al dispositivo',
    cancelButtonTitle: 'Cancelar',
    invalidateOnEnrollment: true,
    disableBackup: true
  }
};

export const BiometricIcons = {
  [BiometricType.Finger]: 'icons/huella.svg',
  [BiometricType.Face]: 'icons/face-id.svg'
};

export const BiometricIconClass = {
  [BiometricType.Finger]: 'icon-Huella',
  [BiometricType.Face]: 'icon-faceid'
};
