import * as actions from '@modules/digital-debit-card/store/digital-debit-card.actions';
import {
  DigitalDebitCardState,
  initialDigitalDebitCardState
} from '@modules/digital-debit-card/store/digital-debit-card.state';

import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialDigitalDebitCardState,
  on(actions.fetchDigitalDebitCardsAction, (state: DigitalDebitCardState) => ({
    ...state,
    cards: null,
    working: true,
    completed: false
  })),
  on(
    actions.fetchDigitalDebitCardsSuccessAction,
    (state: DigitalDebitCardState, { cards }) => ({
      ...state,
      cards,
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchDigitalDebitCardsErrorAction,
    (state: DigitalDebitCardState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  ),
  on(actions.createDigitalDebitCardAction, (state: DigitalDebitCardState) => ({
    ...state,
    response: null
  })),
  on(
    actions.createDigitalDebitCardSuccessAction,
    (state: DigitalDebitCardState, { response }) => ({
      ...state,
      response
    })
  ),
  on(actions.editDigitalDebitCardAction, (state: DigitalDebitCardState) => ({
    ...state,
    response: null
  })),
  on(
    actions.editDigitalDebitCardSuccessAction,
    (state: DigitalDebitCardState, { response }) => ({
      ...state,
      response
    })
  ),
  on(
    actions.setDigitalDebitCardsViewedAction,
    (state: DigitalDebitCardState, { cardsViewed }) => ({
      ...state,
      cardsViewed
    })
  ),
  on(
    actions.setProductSelected,
    (state: DigitalDebitCardState, { product }) => ({
      ...state,
      productSelected: product
    })
  ),
  on(actions.setActivateUrlBackTo, (state: DigitalDebitCardState, { url }) => ({
    ...state,
    activateUrlBackTo: url
  }))
);

export const digitalDebitCardReducer = (
  state: DigitalDebitCardState,
  action: Action
): DigitalDebitCardState => {
  return featureReducer(state, action);
};
