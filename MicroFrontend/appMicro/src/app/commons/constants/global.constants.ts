import {
  AlertComponentType,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const OPEN_EXTERNAL_URL_ALERT = {
  id: 'open-external-url-alert',
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  icon: 'illustrationsV2/cerrar-sesion-regular.svg',
  title: 'REDIRECT_EXTERNAL_URL.TITLE',
  description: 'REDIRECT_EXTERNAL_URL.DESCRIPTION',
  buttons: ['REDIRECT_EXTERNAL_URL.BUTTONS.OK', 'ACTIONS.CANCEL']
};

export const ALLOWED_URLS_FOR_DEEPLINK: string[] = ['/qr/authorization'];

export enum Platform {
  IOS = 'ios',
  ANDROID = 'android'
}
