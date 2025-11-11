import { Action, createReducer, on } from '@ngrx/store';
import {
  VirtualCreditCardState,
  initialVirtualCreditCardState
} from '@modules/virtual-credit-card/store/virtual-credit-card.state';
import * as actions from '@modules/virtual-credit-card/store/virtual-credit-card.actions';

const featureReducer = createReducer(
  initialVirtualCreditCardState,
  on(actions.fetchVirtualCreditCardsAction, (state) => ({
    ...state,
    cards: null,
    working: true,
    completed: false
  })),
  on(
    actions.fetchVirtualCreditCardsSuccessAction,
    (state, { cards, maxCardsLimit }) => ({
      ...state,
      cards,
      maxCardsLimit,
      totalCardsCreated: cards?.length,
      working: false,
      completed: true
    })
  ),
  on(actions.fetchVirtualCreditCardsErrorAction, (state, { message }) => ({
    ...state,
    message,
    working: false,
    completed: false
  })),
  on(actions.setProductSelected, (state, { product }) => ({
    ...state,
    productSelected: product
  })),
  on(actions.setActivateUrlBackTo, (state, { url }) => ({
    ...state,
    activateUrlBackTo: url
  })),
  on(actions.setCreditLimitAction, (state, { creditLimit }) => ({
    ...state,
    creditLimit
  })),
  on(actions.resetVirtualCreditCardsAction, (state) => ({
    ...initialVirtualCreditCardState,
    maxCardsLimit: state.maxCardsLimit
  }))
);

export const virtualCreditCardReducer = (
  state: VirtualCreditCardState,
  action: Action
): VirtualCreditCardState => featureReducer(state, action);
