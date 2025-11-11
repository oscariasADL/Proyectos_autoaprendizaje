import {
  AlertComponentType,
  AlertSheetIcon
} from '@commons/entities/alert/alert-sheet.entities';

export const REGISTER_BIOMETRIC_ALERT = {
  id: 'alert-biometric-info',
  componentType: AlertComponentType.alertCenter,
  icon: AlertSheetIcon.success,
  title: 'BIOMETRICS.MODAL.REGISTER_BIOMETRIC.TITLE',
  buttons: [
    'BIOMETRICS.MODAL.REGISTER_BIOMETRIC.CONTINUE',
    'BIOMETRICS.MODAL.REGISTER_BIOMETRIC.SET_UP_LATER'
  ]
};

export const BIOMETRIC_ERROR_ALERT = {
  id: 'alert-biometric-error',
  componentType: AlertComponentType.alertCenter,
  icon: 'icons/datos-no-coinciden.svg',
  buttons: ['BIOMETRICS.MODAL.BIOMETRIC_ERROR.CONTINUE']
};
