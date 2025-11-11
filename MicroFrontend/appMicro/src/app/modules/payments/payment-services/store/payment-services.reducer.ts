import {
  initialPaymentServicesState,
  initialSearchBillState,
  PaymentServicesState
} from '@modules/payments/payment-services/store/payment-services.state';
import { Action, createReducer, on } from '@ngrx/store';
import { format, parseISO } from 'date-fns';
import * as actions from './payment-services.actions';

const searchBillsReducer = createReducer(
  initialSearchBillState,
  on(actions.searchCategory, (state) => ({
    ...state,
    data: [],
    workingCategory: true,
    completedCategory: null,
    message: ''
  })),
  on(actions.searchCategorySuccess, (state, { payload }) => ({
    ...state,
    data: payload,
    workingCategory: false,
    completedCategory: true
  })),
  on(actions.searchCategoryError, (state, { message }) => ({
    ...state,
    workingCategory: false,
    completedCategory: false,
    message
  })),
  on(actions.searchCategoryClean, (state) => ({
    ...state,
    workingCategory: false,
    completedCategory: null,
    data: [],
    message: ''
  })),
  on(actions.searchBillReference, (state) => ({
    ...state,
    referenceInfo: null,
    working: true,
    completed: null,
    notFound: false,
    hasErrorMessage: false,
    message: ''
  })),
  on(actions.searchBillReferenceSuccess, (state, { referenceInfo }) => ({
    ...state,
    referenceInfo: {
      ...referenceInfo,
      ...(referenceInfo?.maxPaymentDateComplete
        ? {
            maxPaymentDate: format(
              parseISO(referenceInfo?.maxPaymentDateComplete),
              'dd/MM/yyyy'
            )
          }
        : {})
    },
    working: false,
    completed: true
  })),
  on(
    actions.searchBillReferenceError,
    (state, { hasErrorMessage, message }) => ({
      ...state,
      notFound: !hasErrorMessage,
      working: false,
      completed: false,
      hasErrorMessage,
      message
    })
  ),
  on(actions.searchBillReferenceClean, (state) => ({
    ...state,
    referenceInfo: null,
    working: false,
    completed: false,
    notFound: false,
    hasErrorMessage: false,
    message: ''
  }))
);

const featureReducer = createReducer(
  initialPaymentServicesState,
  on(actions.fetchPaymentServicesAction, (state: PaymentServicesState) => ({
    ...state,
    services: null,
    working: true,
    completed: false
  })),
  on(
    actions.fetchPaymentServicesSuccessAction,
    (state: PaymentServicesState, { services }) => ({
      ...state,
      services,
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchPaymentServicesErrorAction,
    (state: PaymentServicesState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  ),
  on(
    actions.setBillAction,
    (state: PaymentServicesState, { bill: billSelected }) => ({
      ...state,
      billSelected
    })
  ),
  on(actions.payBillSuccessAction, (state: PaymentServicesState) => ({
    ...state,
    billSelected: null
  })),
  on(actions.setBillSchedulingPayloadAction, (state, { payload }) => ({
    ...state,
    billSchedulePayload: payload
  }))
);

export const paymentServicesReducer = (
  state: PaymentServicesState,
  action: Action
): PaymentServicesState => {
  return {
    ...featureReducer(state, action),
    searchBills: searchBillsReducer(
      !!state ? state.searchBills : initialSearchBillState,
      action
    )
  };
};
