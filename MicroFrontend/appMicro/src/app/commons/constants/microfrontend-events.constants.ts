export const MICROFRONTEND_TOPICS = {
  BASIC_CUSTOMER_INFORMATION: 'basicCustomerInformation',
  BASIC_CUSTOMER_ACCOUNTS: 'basicCustomerAccounts',
  PRODUCT_SUMMARY: 'productSummary',
  HEART_BEAT: 'heartBeat',
  EXIT_EVENT: 'exitEvent',
  REDIRECT_TO_HOME_EVENT: 'redirectToHomeEvent',
  AUTHORIZE_TRANSACTION: 'authorizeTransaction',
  SPI_TRANSACTION_AUTHORIZED: 'spiTransactionAuthorized',
  SPI_KEY_TRANSFER: 'spiKeyTransfer'
};

export const CDT_MICROFRONTEND_EVENTS = {
  error: 'errorCdtCreation',
  success: 'successCdtCreation',
  exit: 'exitCdt'
};

export const DIGITAL_HOUSING_MICROFRONTEND_EVENTS = {
  error: 'errorDigitalHousingCreation',
  success: 'successDigitalHousingCreation',
  exit: 'exitDigitalHousing',
  redirectToHomeEvent: 'redirectToHomeEvent'
};

export const CREDIT_CARD_MICROFRONTEND_EVENTS = {
  error: 'errorCreditCardCreation',
  success: 'successCreditCardCreation',
  exit: 'exitCreditCard',
  redirectToHomeEvent: 'redirectToHomeEvent'
};

export const PERSONAL_LOAN_MICROFRONTEND_EVENTS = {
  error: 'errorPersonalLoanCreation',
  success: 'successPersonalLoanCreation',
  exit: 'exitPersonalLoan',
  redirectToHomeEvent: 'redirectToHomeEvent'
};

export enum CDTEventsActions {
  BASIC_DATA_FROM_MICROFRONTEND = 'datos del cliente a MF',
  RESPONSE_DATA_FROM_MICROFRONTEND_CDT = 'respuesta creacion cdt',
  EXIT_FROM_CDT = 'Salio de la creacion de cdt'
}

export enum DigitalHousingActions {
  RESPONSE_DATA_FROM_MICROFRONTEND_DIGITAL_HOUSING = 'Respuesta de creacion de crédito hipotecario',
  EXIT_FROM_MICROFRONTEND_DIGITAL_HOUSING = 'Abandono la creacion del crédito hipotecario',
  REDIRECT_TO_HOME_EVENT = 'Redireccion a la home'
}

export enum CreditCardActions {
  RESPONSE_DATA_FROM_MICROFRONTEND_CREDIT_CARD = 'Respuesta de creacion de la tarjeta de crédito',
  EXIT_FROM_MICROFRONTEND_CREDIT_CARD = 'Abandono la creacion de la tarjeta de crédito',
  REDIRECT_TO_HOME_EVENT = 'Redireccion a la home'
}

export enum PersonalLoanActions {
  RESPONSE_DATA_FROM_MICROFRONTEND_PERSONAL_LOAN = 'Respuesta de creacion del crédito de libre inversión',
  EXIT_FROM_MICROFRONTEND_PERSONAL_LOAN = 'Abandono la creacion del crédito de libre inversión',
  REDIRECT_TO_HOME_EVENT = 'Redireccion a la home'
}

export const MOBILE_AVV_CHANNEL = 'Banca Movíl AVV';
