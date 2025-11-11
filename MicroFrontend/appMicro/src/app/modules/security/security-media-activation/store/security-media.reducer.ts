import { Action, createReducer, on } from '@ngrx/store';
import * as featureActions from './security-media.action';
import {
  findOtherProducts,
  findProductToActivate
} from './security-media.selector';
import { initialSecurityState, SecurityState } from './security-media.state';

const featureReducer = createReducer(
  initialSecurityState,
  on(featureActions.resetSecurity, (state) => ({
    ...initialSecurityState
  })),
  on(featureActions.fetchProducts, (state) => ({
    ...state,
    products: null,
    productsToActivate: null,
    productsOtherProducts: null,
    working: true,
    completed: false,
    message: 'Loading..'
  })),
  on(featureActions.fetchProductsSuccess, (state, { payload }) => ({
    ...state,
    products: payload,
    productsToActivate: findProductToActivate(payload),
    productsOtherProducts: findOtherProducts(payload),
    working: false,
    completed: true,
    message: ''
  })),
  on(featureActions.fetchProductsError, (state, { payload }) => ({
    ...state,
    working: false,
    completed: true,
    message: payload
  })),
  on(featureActions.activateProduct, (state) => ({
    ...state,
    message: ''
  })),
  on(featureActions.activateProductSetStep, (state, { step, message }) => ({
    ...state,
    step,
    message
  })),
  on(featureActions.setMediaActivationType, (state, { mediaType }) => ({
    ...state,
    mediaType
  })),
  on(featureActions.suspiciousTransaction, (state, { product }) => ({
    ...state,
    suspiciousTransaction: {
      data: null,
      working: true,
      completed: false,
      message: 'Loading..'
    }
  })),
  on(
    featureActions.suspiciousTransactionSuccess,
    (state, { suspiciousTransaction }) => ({
      ...state,
      suspiciousTransaction: {
        data: suspiciousTransaction,
        working: false,
        completed: true,
        message: ''
      }
    })
  ),
  on(featureActions.suspiciousTransactionError, (state, { message }) => ({
    ...state,
    suspiciousTransaction: {
      data: null,
      working: false,
      completed: false,
      message
    }
  }))
);

export function securityConfigReducer(
  state: SecurityState | undefined,
  action: Action
): any {
  return featureReducer(state, action);
}
