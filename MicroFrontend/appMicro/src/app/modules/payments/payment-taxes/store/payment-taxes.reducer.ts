import { Action, createReducer, on } from '@ngrx/store';
import * as featureActions from './payment-taxes.action';
import {
  initialPaymentTaxesState,
  PaymentTaxesState
} from './payment-taxes.state';

const featureReducer = createReducer(
  initialPaymentTaxesState,
  on(featureActions.fetchCities, (state) => ({
    ...state,
    cities: {
      list: [],
      working: true,
      completed: false,
      message: 'Loading...'
    }
  })),
  on(featureActions.fetchCitiesSuccess, (state, { list }) => ({
    ...state,
    cities: {
      list,
      working: false,
      completed: true,
      message: ''
    }
  })),
  on(featureActions.fetchCitiesError, (state, { message }) => ({
    ...state,
    cities: {
      list: [],
      working: false,
      completed: true,
      message
    }
  })),
  on(featureActions.fetchAgreements, (state) => ({
    ...state,
    agreements: {
      list: [],
      working: true,
      completed: false,
      message: 'Loading...'
    }
  })),
  on(featureActions.fetchAgreementsSuccess, (state, { payload }) => ({
    ...state,
    agreements: {
      list: payload,
      working: false,
      completed: true,
      message: ''
    }
  })),
  on(featureActions.fetchAgreementsError, (state, { message }) => ({
    ...state,
    agreements: {
      ...state.agreements,
      working: false,
      completed: true,
      message
    }
  })),
  on(featureActions.fetchReferenceValue, (state) => ({
    ...state,
    agreementDetail: {
      ...state.agreementDetail,
      data: null,
      working: true,
      completed: false,
      notFound: false,
      message: 'Loading...'
    }
  })),
  on(featureActions.fetchReferenceValueSuccess, (state, { payload }) => ({
    ...state,
    agreementDetail: {
      ...state.agreementDetail,
      data: payload,
      working: false,
      completed: true,
      message: ''
    }
  })),
  on(featureActions.fetchReferenceValueError, (state, { message }) => ({
    ...state,
    agreementDetail: {
      ...state.agreementDetail,
      data: null,
      working: false,
      completed: true,
      message
    }
  })),
  on(featureActions.fetchReferenceNotFound, (state, { message }) => ({
    ...state,
    agreementDetail: {
      ...state.agreementDetail,
      data: null,
      working: false,
      completed: true,
      notFound: true,
      message
    }
  })),
  on(featureActions.cleanReferenceDetail, (state) => ({
    ...state,
    agreementDetail: {
      ...state.agreementDetail,
      data: null,
      completed: false
    }
  }))
);

export function paymentTaxesReducer(
  state: PaymentTaxesState | undefined,
  action: Action
): any {
  return featureReducer(state, action);
}
