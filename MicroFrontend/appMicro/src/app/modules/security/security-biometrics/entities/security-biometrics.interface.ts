import { BiometricType } from '@modules/auth/login/entities/biometric.interface';

export const BiometricBigIcons = {
  [BiometricType.Finger]: 'icons/touch-id-big.svg',
  [BiometricType.Face]: 'icons/face-id-big.svg'
};

export const BiometricTexts = {
  [BiometricType.Finger]: 'BIOMETRICS.TYPE.TOUCH_ID',
  [BiometricType.Face]: 'BIOMETRICS.TYPE.FACE_ID'
};

export enum SecurityBiometricStep {
  question = 'question',
  password = 'password',
  finished = 'finished',
  error = 'error'
}

export enum BiometricFinishedIcon {
  success = 'illustrations/success.svg',
  error = 'icons/recargar-celular-cancelar.svg'
}

export interface VerifyPasswordPayload {
  password: string;
}
