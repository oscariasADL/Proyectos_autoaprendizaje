import {
  paymentSocialSecurityFeatureName,
  PaymentSocialSecurityState
} from '@modules/payments/payment-social-security/store/payment-social-security.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const paymentSocialSecurityState =
  createFeatureSelector<PaymentSocialSecurityState>(
    paymentSocialSecurityFeatureName
  );

export const contributorsSelector = createSelector(
  paymentSocialSecurityState,
  (state: PaymentSocialSecurityState) => state.contributors.list
);

export const workingContributorsSelector = createSelector(
  paymentSocialSecurityState,
  (state: PaymentSocialSecurityState) => state.contributors.working
);
