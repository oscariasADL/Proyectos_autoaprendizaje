import { environment as ENV } from '@environment';

const {
  security,
  bills,
  parameter,
  statements,
  management,
  payments,
  transactions,
  transfiya,
  base,
  taxes,
  auth,
  qr,
  enrollment,
  core
} = ENV.api.services;

function cleanUrl(url: string): string {
  return url.split('{')[0];
}

export const BLACKLIST_AUTHORIZED_URLS = [
  cleanUrl(security.interchange),
  cleanUrl(bills.search_services),
  cleanUrl(parameter)
];

export const BLACKLIST_TEXT_URLS = [
  cleanUrl(statements.extracts.file),
  cleanUrl(management.ip)
];

export const INTERCHANGE_KEY_URL = cleanUrl(security.interchange);

export const URL_WITH_CUSTOM_FACTS_REQUIRED = [
  cleanUrl(payments.mobile_recharge),
  cleanUrl(transactions.withdraw),
  cleanUrl(transfiya.consignments_allow),
  cleanUrl(transactions.transfers.avvCel2cel),
  cleanUrl(transactions.transfiya_request),
  cleanUrl(transactions.use_quota),
  cleanUrl(transactions.transfers.contacts),
  cleanUrl(base.activations),
  cleanUrl(taxes.tax_payment),
  cleanUrl(bills.social_security),
  cleanUrl(auth.login),
  cleanUrl(bills.services_pay_unregistered),
  cleanUrl(transactions.card_advance),
  cleanUrl(transactions.transfers.own),
  cleanUrl(qr.payment_dale),
  cleanUrl(qr.payment),
  cleanUrl(base.temporary_block),
  cleanUrl(base.blocking),
  cleanUrl(base.block_account),
  cleanUrl(payments.debt_purchase),
  cleanUrl(auth.rsa_biometrics),
  cleanUrl(transactions.rsa_spi),
  cleanUrl(base.modify_aval_tag),
  cleanUrl(transactions.transfers.breB)
];

export const STORM_EXEMPT_URLS: string[] = [
  enrollment.base_sf,
  management.forgot_password_sf,
  core.complementary_services_sf
];

export const DEVICE_TOKEN_URLS: string[] = [
  enrollment.base,
  enrollment.base_sf,
  enrollment.biometrics,
  enrollment.biometrics_sf,
  management.forgot_password,
  management.forgot_password_sf,
  management.biometrics,
  management.biometrics_sf
];
