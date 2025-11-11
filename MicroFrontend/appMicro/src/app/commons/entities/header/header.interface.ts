import * as routes from '@commons/constants/navigate.constants';

export interface HeaderScopes {
  primary?: boolean;
  secondary?: boolean;
}

export enum HeaderType {
  redPrimary = 'redPrimary',
  redSecondary = 'redSecondary',
  redTertiary = 'redTertiary',
  redQuaternary = 'redQuaternary',
  redFive = 'redFive',
  redHeadingSix = 'redHeadingSix',
  whitePrimary = 'whitePrimary',
  whiteSecondary = 'whiteSecondary',
  whiteTertiary = 'whiteTertiary'
}

export const SHOW_LOGO_ICON: HeaderType[] = [HeaderType.redPrimary];

export const SHOW_MENU_ICON: HeaderType[] = [
  HeaderType.redPrimary,
  HeaderType.redSecondary
];

export const SHOW_NOTIFICATION_ICON: HeaderType[] = [
  HeaderType.redPrimary,
  HeaderType.redSecondary
];

export const SHOW_CLOSE_ICON: HeaderType[] = [
  HeaderType.redTertiary,
  HeaderType.redQuaternary,
  HeaderType.whitePrimary,
  HeaderType.whiteSecondary,
  HeaderType.redHeadingSix
];

export const SHOW_BACK_ICON: HeaderType[] = [
  HeaderType.redSecondary,
  HeaderType.redTertiary,
  HeaderType.redFive,
  HeaderType.whitePrimary,
  HeaderType.whiteTertiary,
  HeaderType.redHeadingSix
];

export const BACKGROUND_RED: HeaderType[] = [
  HeaderType.redPrimary,
  HeaderType.redSecondary,
  HeaderType.redTertiary,
  HeaderType.redFive,
  HeaderType.redQuaternary,
  HeaderType.redHeadingSix
];

export const BACKGROUND_WHITE: HeaderType[] = [
  HeaderType.whitePrimary,
  HeaderType.whiteSecondary,
  HeaderType.whiteTertiary
];

export const HEADER_WITH_MENU = [
  ...routes.HOME,
  ...routes.PRODUCTS,
  ...routes.PRODUCT_DETAIL,
  ...routes.PAYMENTS,
  ...routes.TRANSFERS,
  ...routes.WITHDRAW,
  ...routes.SERVICES,
  ...routes.CREDITS,
  ...routes.CONTACTS
];

export const HEADER_SPECIAL_WITH_MENU = [
  ...routes.PRODUCTS,
  ...routes.PRODUCT_DETAIL
];
