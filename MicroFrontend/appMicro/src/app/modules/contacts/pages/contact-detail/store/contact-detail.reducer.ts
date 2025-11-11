import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './contact-detail.actions';
import {
  ContactDetailState,
  initialContactDetailState
} from './contact-detail.state';

const featureReducer = createReducer(
  initialContactDetailState,
  on(actions.fetchContactProductsAction, (state: ContactDetailState) => ({
    ...state,
    products: null,
    working: true,
    completed: false
  })),
  on(
    actions.fetchContactProductsSuccessAction,
    (state: ContactDetailState, { products }) => ({
      ...state,
      products,
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchContactProductsErrorAction,
    (state: ContactDetailState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  )
);

export const contactDetailReducer = (
  state: ContactDetailState,
  action: Action
): ContactDetailState => {
  return featureReducer(state, action);
};
