import {
  mapBalance,
  mapBalanceOnlyCreditCard,
  mapCategories,
  mapNicknames
} from '@modules/home/mappers/home.mapper';
import { Action, createReducer, on } from '@ngrx/store';
import orderBy from 'lodash/orderBy';
import * as actions from './product.actions';
import { initialProductState, ProductState } from './product.state';
import { mapSPIInformation } from '@modules/product/mappers/product-home.mapper';

const featureReducer = createReducer(
  initialProductState,
  on(actions.fetchProductsAction, (state: ProductState) => ({
    ...state,
    balance: [],
    balanceWorking: true,
    balanceCompleted: false,
    balanceCategories: []
  })),
  on(actions.fetchProductsWithoutReloadAction, (state: ProductState) => ({
    ...state,
    workingTC: true,
    completedTC: false,
    firstCallTC: true
  })),
  on(
    actions.fetchProductsSuccessAction,
    (state: ProductState, { balance }) => ({
      ...state,
      balance: mapBalance(balance),
      balanceWorking: false,
      balanceCompleted: true,
      balanceCategories: mapCategories(balance)
    })
  ),
  on(
    actions.fetchProductsWithoutReloadSuccessAction,
    (state: ProductState, { balance }) => ({
      ...state,
      balance: mapBalanceOnlyCreditCard(balance, state.balance),
      workingTC: false,
      completedTC: true
    })
  ),
  on(actions.fetchProductsErrorAction, (state: ProductState, { message }) => ({
    ...state,
    balanceWorking: false,
    balanceCompleted: false,
    workingTC: false,
    completedTC: false,
    message
  })),
  on(actions.fetchProductsFirstCallToggleAction, (state: ProductState) => ({
    ...state,
    firstCall: !state.firstCall
  })),
  on(
    actions.fetchProductsNicknamesSuccessAction,
    (state: ProductState, { nicknames }) => {
      const _balanceWithNicknames = mapNicknames(state.balance, nicknames);
      return {
        ...state,
        balance: orderBy(_balanceWithNicknames, ['typeProduct'], ['asc']),
        balanceCategories: mapCategories(_balanceWithNicknames),
        nicknames
      };
    }
  ),
  on(actions.fetchProductSpiUserKeysAction, (state: ProductState) => ({
    ...state,
    spiUserKeys: [],
    workingSpiUserKey: true,
    completedSpiUserKey: false
  })),
  on(
    actions.fetchProductSpiUserKeysSuccessAction,
    (state: ProductState, { spiUserKeys }) => {
      const _balanceWithSpiUserKeys = mapSPIInformation(
        state.balance,
        spiUserKeys
      );
      return {
        ...state,
        balance: orderBy(_balanceWithSpiUserKeys, ['typeProduct'], ['asc']),
        spiUserKeys,
        workingSpiUserKey: false,
        completedSpiUserKey: true
      };
    }
  ),
  on(actions.fetchProductSpiUserKeysErrorAction, (state: ProductState) => ({
    ...state,
    workingSpiUserKey: false,
    completedSpiUserKey: false
  })),
  on(
    actions.fetchSPIAuthorizationSuccessAction,
    (state: ProductState, { status }) => ({
      ...state,
      isSPIAuthorization: status
    })
  ),
  on(actions.fetchSPIAuthorizationErrorAction, (state: ProductState) => ({
    ...state,
    isSPIAuthorization: false
  })),
  on(actions.acceptSpiConsentSuccessAction, (state: ProductState) => ({
    ...state,
    spiConsentAccepted: true
  })),
  on(actions.acceptSpiConsentErrorAction, (state: ProductState) => ({
    ...state,
    spiConsentAccepted: false
  })),
  on(actions.fetchProductsCountRetryAction, (state: ProductState) => {
    return {
      ...state,
      retries: state.retries - 1
    };
  }),
  on(
    actions.setHiddenBalanceAction,
    (state: ProductState, { hiddenBalance }) => {
      return {
        ...state,
        hiddenBalance,
        workingHiddenBalance: true
      };
    }
  ),
  on(
    actions.setHiddenBalanceSuccessAction,
    (state: ProductState, { hiddenBalance }) => {
      return {
        ...state,
        hiddenBalance,
        workingHiddenBalance: false
      };
    }
  ),
  on(actions.resetFirstCallTCAction, (state: ProductState, {}) => {
    return {
      ...state,
      firstCallTC: false
    };
  })
);
export const productReducer = (
  state: ProductState,
  action: Action
): ProductState => {
  return featureReducer(state, action);
};
