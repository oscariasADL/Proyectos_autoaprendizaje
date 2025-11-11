import * as actions from '@modules/product-options/credit-movements/store/credit-movements.action';
import {
  CreditMovementsState,
  initialCreditMovementsState
} from '@modules/product-options/credit-movements/store/credit-movements.state';
import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialCreditMovementsState,
  on(actions.fetchCreditMovementsAction, (state) => ({
    ...state,
    movements: null,
    working: true,
    completed: false
  })),
  on(actions.fetchCreditMovementsSuccessAction, (state, { movements }) => ({
    ...state,
    movements,
    working: false,
    completed: true
  })),
  on(actions.fetchCreditMovementsErrorAction, (state, { message }) => ({
    ...state,
    working: false,
    completed: false,
    message
  }))
);

export const creditMovementsReducer = (
  state: CreditMovementsState,
  action: Action
): CreditMovementsState => {
  return featureReducer(state, action);
};
