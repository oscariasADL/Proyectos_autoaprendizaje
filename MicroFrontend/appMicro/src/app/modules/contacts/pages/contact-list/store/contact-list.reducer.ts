import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './contact-list.actions';
import {
  ContactListState,
  initialContactListState
} from './contact-list.state';

const featureReducer = createReducer(
  initialContactListState,
  on(actions.fetchContactsAction, (state: ContactListState) => ({
    ...state,
    pockets: null,
    working: true,
    completed: false
  })),
  on(
    actions.fetchContactsSuccessAction,
    (state: ContactListState, { contacts }) => ({
      ...state,
      contacts,
      working: false,
      completed: contacts.length > 0
    })
  ),
  on(
    actions.fetchContactsErrorAction,
    (state: ContactListState, { message }) => ({
      ...state,
      working: false,
      completed: true,
      message
    })
  ),
  on(actions.setContactFilterAction, (state: ContactListState, { filter }) => ({
    ...state,
    filter
  }))
);

export const contactListReducer = (
  state: ContactListState,
  action: Action
): ContactListState => {
  return featureReducer(state, action);
};
