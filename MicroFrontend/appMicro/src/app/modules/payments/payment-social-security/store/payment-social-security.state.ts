import { Contributor } from '@modules/payments/payment-social-security/entities/social-security.interface';

export const paymentSocialSecurityFeatureName =
  'paymentSocialSecurityModuleState';

export type PaymentSocialSecurityState = Readonly<{
  contributors: {
    list: Contributor[];
    working: boolean;
    completed: boolean;
    message: string;
  };
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialPaymentSocialSecurityState: PaymentSocialSecurityState = {
  contributors: {
    list: [],
    working: false,
    completed: false,
    message: ''
  },
  working: false,
  completed: null,
  message: ''
};
