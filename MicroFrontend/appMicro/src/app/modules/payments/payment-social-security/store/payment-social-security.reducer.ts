import * as actions from '@modules/payments/payment-social-security/store/payment-social-security.actions';
import { Action, createReducer, on } from '@ngrx/store';
import {
  initialPaymentSocialSecurityState,
  PaymentSocialSecurityState
} from './payment-social-security.state';

const featureReducer = createReducer(
  initialPaymentSocialSecurityState,
  on(actions.fetchContributorAction, (state: PaymentSocialSecurityState) => ({
    ...state,
    contributors: {
      ...state.contributors,
      list: [],
      working: true,
      completed: false
    }
  })),
  on(
    actions.fetchContributorSuccessAction,
    (state: PaymentSocialSecurityState, { contributors }) => ({
      ...state,
      contributors: {
        ...state.contributors,
        list: contributors,
        working: false,
        completed: true
      }
    })
  ),
  on(
    actions.fetchContributorErrorAction,
    (state: PaymentSocialSecurityState, { message }) => ({
      ...state,
      contributors: {
        ...state.contributors,
        working: false,
        completed: false,
        message
      }
    })
  )
);

export const paymentSocialSecurityReducer = (
  state: PaymentSocialSecurityState,
  action: Action
): PaymentSocialSecurityState => {
  return featureReducer(state, action);
};
