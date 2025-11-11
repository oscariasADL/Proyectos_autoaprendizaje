import { mapPaymentsResponse } from '@modules/payments/payment-credits/mappers/payment-credits-response.mapper';
import * as actions from '@modules/payments/payment-credits/store/payment-credits.actions';
import {
  initialPaymentCreditsState,
  PaymentCreditsState
} from '@modules/payments/payment-credits/store/payment-credits.state';
import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialPaymentCreditsState,
  on(
    actions.setPaymentsFilteredAction,
    (state: PaymentCreditsState, { filter: filterSelected }) => ({
      ...state,
      filterSelected
    })
  ),
  on(
    actions.fetchPaymentsFilteredAction,
    (state: PaymentCreditsState, { filter: filterSelected }) => ({
      ...state,
      filterSelected,
      data: null,
      working: true,
      completed: false
    })
  ),
  on(
    actions.fetchPaymentsFilteredSuccessAction,
    (state: PaymentCreditsState, { data }) => ({
      ...state,
      data: mapPaymentsResponse(data, state.filterSelected),
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchPaymentsFilteredErrorAction,
    (state: PaymentCreditsState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  ),
  on(
    actions.setCreditSelectedAction,
    (state: PaymentCreditsState, { creditSelected }) => ({
      ...state,
      creditSelected
    })
  )
);
export const paymentCreditsReducer = (
  state: PaymentCreditsState,
  action: Action
): PaymentCreditsState => {
  return featureReducer(state, action);
};
