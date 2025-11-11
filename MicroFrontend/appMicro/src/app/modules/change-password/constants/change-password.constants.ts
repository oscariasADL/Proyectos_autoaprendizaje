import {
  AlertComponentType,
  AlertSheetIcon,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const CURRENT_PASSWORD_ERROR = '1611';
export const CHANGE_PASSWORD_ERROR_ALERT: AlertSheetProperties = {
  id: 'alert-change-password-error',
  type: AlertSheetType.error,
  componentType: AlertComponentType.alertSheet,
  icon: AlertSheetIcon.error,
  title: 'CHANGE_PASSWORD.ERROR.DESCRIPTION',
  buttons: ['CHANGE_PASSWORD.ERROR.BUTTON']
};
