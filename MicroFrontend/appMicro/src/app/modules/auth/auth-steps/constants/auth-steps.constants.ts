import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const AUTH_STEPS_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.error,
  id: 'auth-steps-exit-alert',
  title: 'AUTH.EXIT_DATA.TEXT',
  buttons: ['AUTH.EXIT_DATA.BUTTON']
};

export const VIRTUAL_BANKING_ALERT = {
  id: 'registering-device-error-alert',
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  icon: 'illustrationsV2/cerrar-sesion-regular.svg',
  title: 'AUTH.STEP.REGISTERING_DEVICE_ERROR.ALERT.TITLE',
  description: 'AUTH.STEP.REGISTERING_DEVICE_ERROR.ALERT.DESCRIPTION',
  buttons: [
    'AUTH.STEP.REGISTERING_DEVICE_ERROR.ALERT.BUTTON',
    'AUTH.STEP.REGISTERING_DEVICE_ERROR.ALERT.CANCEL'
  ]
};

export const TIME_WAIT_TO_REQUEST_AGAIN_OTP = 40; // seconds
