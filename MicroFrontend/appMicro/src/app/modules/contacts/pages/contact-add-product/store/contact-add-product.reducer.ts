import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './contact-add-product.actions';
import {
  ContactAddProductState,
  initialContactAddProductState
} from './contact-add-product.state';

const featureReducer = createReducer(
  initialContactAddProductState,
  on(actions.contactAddProductAction, (state: ContactAddProductState) => ({
    ...state,
    working: true,
    completed: false
  })),
  on(
    actions.contactAddProductSuccessAction,
    (state: ContactAddProductState) => ({
      ...state,
      working: false,
      completed: true
    })
  ),
  on(
    actions.contactAddProductFinishedAction,
    (state: ContactAddProductState) => ({
      ...state,
      working: false,
      completed: true
    })
  ),
  on(actions.contactAddProductErrorAction, (state: ContactAddProductState) => ({
    ...state,
    working: false,
    completed: false
  }))
);

export const contactAddProductReducer = (
  state: ContactAddProductState,
  action: Action
): ContactAddProductState => {
  return featureReducer(state, action);
};
