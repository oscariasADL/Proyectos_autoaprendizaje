import {
  AlertComponentType,
  AlertSheetProperties
} from '@commons/entities/alert/alert-sheet.entities';

export const ALLOWED_URLS_FOR_DEEPLINK: string[] = [
  'avvillasapp://apple-activate-token'
];

export const INIT_LOGIN_DEEP_LINK_ALERT: AlertSheetProperties = {
  id: 'login-deep-link-alert',
  icon: 'illustrations/wallet.svg',
  componentType: AlertComponentType.alertCenter,
  title: 'WALLETS.ACTIVATE_TOKEN.ONBOARDING.TITLE',
  description: 'WALLETS.ACTIVATE_TOKEN.ONBOARDING.DESCRIPTION',
  buttons: ['ACTIONS.COPY_THAT']
};
