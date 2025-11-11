import {
  BRE_B_TRANSFERS_PATH,
  BRE_B_TRANSFER_CONFIRMATION_PATH
} from '@app/modules/transfers/pages/bre-b-transfers/constants/bre-b-transfers.constants';

export const SPI_BASE = '/remotes/spi';
export const LOGIN = ['/auth/login'];
export const REGISTER = ['/auth/register'];
export const FORGOT_PASSWORD = ['/auth/forgot-password'];
export const UPDATE_PASSWORD = ['/auth/update-password'];
export const SILENT_ENROLLMENT = ['/auth/silent-enrollment'];
export const BIOMETRIC_FAILURE_URL_FOR_REGISTER = [
  '/auth/register/biometric-verification-failed'
];
export const BIOMETRIC_FAILURE_URL_FOR_FORGOT_PASSWORD = [
  '/auth/forgot-password/biometric-verification-failed'
];

export const REGISTERING_FAILURE_URL_FOR_REGISTER = [
  '/auth/register/registering-device-error'
];
export const REGISTERING_FAILURE_URL_FOR_FORGOT_PASSWORD = [
  '/auth/forgot-password/registering-device-error'
];

export const REGISTERING_DEVICE_URL_FOR_FORGOT_PASSWORD = 'registering-device';

export const HOME = ['/'];
export const ERROR_WITHOUT_PRODUCTS = ['/error-without-products'];
export const PRODUCTS = ['/products'];
export const PRODUCT_DETAIL = ['/product-detail'];
export const PAYMENTS = ['/payments'];
export const TRANSFERS = ['/transfers'];
export const TRANSFERS_CEL2CEL = ['/transfers-cel2cel-home'];
export const TRANSFERS_CEL2CEL_SEND = ['/transfers-cel2cel-send'];
export const TRANSFER_CONTACTS = ['/transfer-contacts'];
export const TRANSFER_AVV_PHONE = ['/transfer-avv-phone'];
export const TRANSFER_AVV_ACCOUNT = ['/transfer-avv-account'];
export const TRANSFER_TRANSFIYA = ['/transfer-transfiya'];
export const TRANSFER_UNREGISTERED_ACCOUNTS = [
  '/transfer-unregistered-accounts'
];
export const SEND_TRANSFIYA_TRANSFER = ['/send-transfiya'];
export const REQUEST_TRANSFIYA_TRANSFER = ['/request-transfiya'];
export const PENDING_TRANSFERS = ['/pending-transfers'];
export const TRUST_RELATION = ['/trust-relation'];
export const TRANSFER_AVAL_TAG = ['/transfer-aval-tag'];
export const DOCUMENTS = ['/documents'];
export const CHANGE_PASSWORD = ['/change-password'];
export const EXTRACTS = ['/extracts'];
export const TAX_CERTIFICATES = ['/tax-certificates'];
export const POCKETS = ['/pockets'];
export const POCKETS_CREATE = ['/pockets/create'];
export const POCKETS_CREATE_ONBOARDING = ['/pockets/create/onboarding'];
export const POCKETS_DETAIL = ['/pockets/detail'];

export const POCKETS_EDIT = ['/pockets/edit'];
export const POCKETS_TRANSFER = ['/pockets/transfer'];
export const POCKETS_PAY = ['/pockets/pay'];
export const POCKETS_MOVEMENTS = ['/pockets/movements'];
export const POCKETS_WITH_RETURNS_CREATE = ['/pockets-with-returns/create'];
export const POCKETS_WITH_RETURNS_DETAIL = ['/pockets-with-returns/detail'];
export const POCKETS_WITH_RETURNS_EDIT = ['/pockets-with-returns/edit'];
export const WITHDRAW = ['/withdraw'];
export const CASH_WITHDRAWAL = ['/cash-withdrawal'];
export const MONEY_ORDER = ['/money-order'];
export const SAFE = ['/safe'];
export const CARD_ADVANCE = ['/card-advance'];
export const USE_QUOTA = ['/use-quota'];
export const RECHARGES = ['/recharges'];
export const CDT_RENEWAL = ['/cdt-renewal'];
export const SERVICES = ['/payments/services'];
export const SERVICES_PAY = ['/payments/services/pay'];
export const SERVICES_PAY_MULTIPLE = ['/payments/services/pay/multiple'];
export const SERVICES_SCHEDULING = ['/payments/services/create-scheduling'];
export const SERVICES_SCHEDULING_CONFIRM = [
  '/payments/services/create-scheduling/confirm'
];
export const CREDITS = ['/payments/credits'];
export const CREDITS_PAY = ['/payments/credits/pay'];
export const SOCIAL_SECURITY = ['/payments/social-security'];
export const TAXES_PAY = ['/payments/taxes/pay'];
export const CONTACTS = ['/contacts'];
export const MOVEMENTS_DETAIL = ['/movements-detail'];
export const DIRECTED_PAYMENTS = ['/directed-payments'];
export const UPDATE_INSTALLMENTS = ['/update-installments'];
export const DEBIT_PURCHASE = ['/debit-purchase'];
export const QR_HOME = ['/qr'];
export const QR_PAY_SCAN = ['/qr/pay/scan'];
export const QR_PAY = ['/qr/pay'];

export const QR_PAY_DALE = ['/qr/pay-dale'];
export const QR_AUTHORIZATION = ['/qr/authorization'];
export const ONBOARDING = ['/onboarding'];
export const SECURITY_HOME = ['/security'];
export const SECURITY_BIOMETRICS = ['/security/biometrics'];
export const COMPLEMENTARY_SERVICES = ['/security/complementary-services'];
export const NOTIFICATIONS = ['/security/notifications'];
export const MEDIA_ACTIVATION = ['/security/media-activation'];
export const MEDIA_ACTIVATION_ACTIVATE_PRODUCT = [
  '/security/media-activation/activate-product'
];
export const BLOCK_ACCOUNT = ['/block-account'];
export const AVAL_PRODUCTS = ['/aval/products'];
export const AVAL_TUPLUS = ['/aval/tu-plus'];
export const AVAL_STOCKS = ['/aval/stocks'];
export const AVAL_STOCKS_DETAIL = ['/aval/stocks-detail'];
export const TRANSFIYA_MANAGEMENT = ['/transfiya-management'];
export const NEW_APP_UPDATE = ['/new-update'];
export const CARE_CHANNELS = ['/care-channels'];
export const CARE_CHANNELS_BENEFITS = ['/care-channels/benefits'];
export const REQUEST_PRODUCTS = ['/request-products'];
export const LOGOUT_BY_INACTIVITY = ['/logout-by-inactivity'];
export const DIGITAL_DEBIT_CARD = ['/digital-debit-card'];
export const DIGITAL_DEBIT_CARD_ACTIVATE = ['/digital-debit-card/activate'];
export const REGISTER_DEVICE_ERROR = [
  '/auth/register/registering-device-error'
];
export const FAVORITES = ['/favorites'];
export const ADD_FAVORITE = ['/favorites/new'];
export const SUPPORT = ['/support'];
export const VIRTUAL_CREDIT_CARD_ACTIVATE = [
  '/virtual-credit-card/activate/onboarding'
];

export const CDT_MICROFRONTEND = ['/remotes/abrir-cdt-digital'];
export const POCKETS_MICROFRONTEND = ['/remotes/bolsillos'];
export const DETAIL_HOUSING_MICROFRONTEND = ['/remotes/vivienda-digital'];
export const CREDIT_CARD_MICROFRONTEND = ['/remotes/tarjeta-credito'];
export const PERSONAL_LOAN_MICROFRONTEND = ['/remotes/libre-inversion'];
export const SPI_MF = [SPI_BASE];

export const WALLET_CARD_LIST = ['/wallets/wallet-card-list'];

export const EDIT_TAG_SPI = ['edit_key'];
export const CONFIRM_EDIT_KEY = ['transaction-result'];
export const MODIFICATION_KEY_FAILED = ['transaction-failed'];

export const OFFLINE = ['/offline'];

export const REMITTANCES = ['transfer-remittances'];
export const ADD_FAVORITES = ['/favorites/new'];
export const BRE_B_TRANSFERS = [BRE_B_TRANSFERS_PATH];
export const BRE_B_TRANSFER_CONFIRMATION = [BRE_B_TRANSFER_CONFIRMATION_PATH];
export const MF_FALLBACK = ['remotes/mf-fallback'];
