import * as routes from '@commons/constants/navigate.constants';

export enum StatusBarType {
  red = 'red',
  white = 'white',
  black = 'black'
}

export const STATUS_BAR_RED = [
  ...routes.PRODUCTS,
  ...routes.PRODUCT_DETAIL,
  ...routes.PAYMENTS,
  ...routes.TRANSFERS,
  ...routes.DOCUMENTS,
  ...routes.POCKETS,
  ...routes.POCKETS_DETAIL,
  ...routes.WITHDRAW,
  ...routes.SERVICES,
  ...routes.CREDITS,
  ...routes.CONTACTS,
  ...routes.SECURITY_HOME,
  ...routes.CARE_CHANNELS
];

export const STATUS_BAR_WHITE = [
  ...routes.REGISTER,
  ...routes.FORGOT_PASSWORD,
  ...routes.UPDATE_PASSWORD,
  ...routes.CHANGE_PASSWORD,
  ...routes.SILENT_ENROLLMENT,
  ...routes.ERROR_WITHOUT_PRODUCTS,
  ...routes.TRANSFER_CONTACTS,
  ...routes.TRANSFER_UNREGISTERED_ACCOUNTS,
  ...routes.REQUEST_TRANSFIYA_TRANSFER,
  ...routes.EXTRACTS,
  ...routes.POCKETS_EDIT,
  ...routes.POCKETS_TRANSFER,
  ...routes.POCKETS_PAY,
  ...routes.CASH_WITHDRAWAL,
  ...routes.MONEY_ORDER,
  ...routes.SAFE,
  ...routes.CARD_ADVANCE,
  ...routes.USE_QUOTA,
  ...routes.RECHARGES,
  ...routes.SERVICES_PAY,
  ...routes.CREDITS_PAY,
  ...routes.SOCIAL_SECURITY,
  ...routes.TAXES_PAY,
  ...routes.MOVEMENTS_DETAIL,
  ...routes.DIRECTED_PAYMENTS,
  ...routes.UPDATE_INSTALLMENTS,
  ...routes.DEBIT_PURCHASE,
  ...routes.QR_HOME,
  ...routes.QR_PAY,
  ...routes.SECURITY_BIOMETRICS,
  ...routes.ONBOARDING,
  ...routes.COMPLEMENTARY_SERVICES,
  ...routes.MEDIA_ACTIVATION,
  ...routes.MEDIA_ACTIVATION_ACTIVATE_PRODUCT,
  ...routes.AVAL_PRODUCTS,
  ...routes.AVAL_TUPLUS,
  ...routes.AVAL_STOCKS,
  ...routes.AVAL_STOCKS_DETAIL,
  ...routes.TRANSFIYA_MANAGEMENT,
  ...routes.NEW_APP_UPDATE,
  ...routes.REQUEST_PRODUCTS,
  ...routes.ADD_FAVORITE
];

export const STATUS_BAR_BLACK = [...routes.LOGIN];
