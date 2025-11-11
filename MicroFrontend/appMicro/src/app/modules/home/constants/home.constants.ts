import { COMPLEMENTARY_SERVICES } from '@commons/constants/navigate.constants';
import {
  AlertComponentType,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import {
  HomeAlertIds,
  HomeAlertPriority,
  HomeAlertProperties,
  RequestProductCard
} from '@modules/home/entities/home-alert.entities';

export const HOME_PROMOTION_ALERT = {
  id: 'home-promotion-alert',
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  icon: 'illustrationsV2/cerrar-sesion-regular.svg',
  title: 'HOME.PROMOTION.ALERT.TITLE',
  description: 'HOME.PROMOTION.ALERT.DESCRIPTION',
  buttons: ['HOME.PROMOTION.ALERT.BUTTON', 'HOME.PROMOTION.ALERT.CANCEL']
};

export const HOME_COMPLEMENTARY_SERVICES_ALERT: HomeAlertProperties = {
  id: HomeAlertIds.COMPLEMENTARY_SERVICES,
  priority: HomeAlertPriority.COMPLEMENTARY_SERVICES,
  description: 'HOME.COMPLEMENTARY_SERVICES_ALERT.DESCRIPTION',
  action: {
    text: 'HOME.COMPLEMENTARY_SERVICES_ALERT.BUTTON',
    url: COMPLEMENTARY_SERVICES
  }
};

export const HOME_COMPLEMENTARY_SERVICES_ERROR_ALERT: HomeAlertProperties = {
  id: HomeAlertIds.COMPLEMENTARY_SERVICES,
  priority: HomeAlertPriority.COMPLEMENTARY_SERVICES,
  description: 'HOME.COMPLEMENTARY_SERVICES_ERROR_ALERT.DESCRIPTION'
};

export const HOME_EXTERNAL_REDIRECTION_ALERT = {
  id: 'home-external-redirection',
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  icon: 'illustrationsV2/cerrar-sesion-regular.svg',
  title: 'REDIRECT_ALERT.TITLE',
  description: 'REDIRECT_ALERT.DESCRIPTION',
  buttons: ['REDIRECT_ALERT.BUTTONS.OK', 'REDIRECT_ALERT.BUTTONS.CANCEL']
};

export enum DocumentNames {
  CC = 'cédula de ciudadanía',
  CE = 'cédula de extranjería',
  TI = 'tarjeta de identidad'
}

export const MATHILDE_URL_INPUT_ID = '#mth_url';

export const TIME_TO_REFRESH = 240; // Seconds

export const TIME_FOR_STORY = 15_000; // Seconds

export const REQUEST_PRODUCTS_CARDS: RequestProductCard[] = [
  {
    title: 'REQUEST_PRODUCTS.HOME.REQUEST_APPLE_PAY.TITLE',
    description: 'REQUEST_PRODUCTS.HOME.REQUEST_APPLE_PAY.DESCRIPTION',
    linkText: 'REQUEST_PRODUCTS.HOME.REQUEST_APPLE_PAY.BUTTON',
    image: 'wallets/request-apple-pay.svg',
    imageAlt: 'REQUEST_PRODUCTS.HOME.REQUEST_APPLE_PAY.ALT_IMG',
    url: 'wallets/apple-pay',
    deviceOs: 'ios'
  },
  {
    title: 'REQUEST_PRODUCTS.HOME.REQUEST_PRODUCTS.TITLE',
    description: 'REQUEST_PRODUCTS.HOME.REQUEST_PRODUCTS.DESCRIPTION',
    linkText: 'REQUEST_PRODUCTS.HOME.REQUEST_PRODUCTS.BUTTON',
    image: 'request-products.svg',
    imageAlt: 'REQUEST_PRODUCTS.HOME.REQUEST_PRODUCTS.ALT_IMG',
    url: 'request-products',
    deviceOs: 'all'
  }
];
