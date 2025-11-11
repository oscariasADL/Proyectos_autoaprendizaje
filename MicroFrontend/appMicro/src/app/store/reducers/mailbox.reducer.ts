import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/mailbox.action';
import { initialMailboxState, MailboxState } from '../state/mailbox.state';

const featureReducer = createReducer(
  initialMailboxState,
  on(actions.registerDeviceMailboxAction, (state: MailboxState) => ({
    ...state,
    working: true,
    completed: false
  })),
  on(actions.registerDeviceMailboxSuccessAction, (state: MailboxState) => ({
    ...state,
    working: false,
    completed: true
  })),
  on(actions.registerDeviceMailboxErrorAction, (state: MailboxState) => ({
    ...state,
    working: false,
    completed: false
  }))
);

export const mailboxReducer = (
  state: MailboxState,
  action: Action
): MailboxState => {
  return featureReducer(state, action);
};
