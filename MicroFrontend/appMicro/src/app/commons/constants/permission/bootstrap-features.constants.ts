import { CHANGE_PASSWORD_FEATURES } from './change-password-features.constants';
import { DOCUMENTS_FEATURES } from './documents-features.constants';
import { ONBOARDING_FEATURES } from './onboarding-features.constants';
import { PAYMENTS_FEATURES } from './payments-features.constants';
import { POCKETS_FEATURES } from './pockets-features.constants';
import { PRODUCTS_FEATURES } from './products-features.constants';
import { SECURITY_FEATURES } from './security-features.constants';
import { WITHDRAW_FEATURES } from './withdraw-features.constants';

// TODO Generate from backend
export const BOOTSTRAP_FEATURES: any = [
  ...WITHDRAW_FEATURES,
  ...DOCUMENTS_FEATURES,
  ...POCKETS_FEATURES,
  ...SECURITY_FEATURES,
  ...CHANGE_PASSWORD_FEATURES,
  ...PAYMENTS_FEATURES,
  ...PRODUCTS_FEATURES,
  ...ONBOARDING_FEATURES
];

export const HIDDEN_FEATURES = [
  'withdraw-feature-hide',
  'cash-withdrawals-feature-hide',
  'money-orders-feature-hide',
  'recharges-feature-hide'
];
