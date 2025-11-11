import { createReducer, Action, on } from '@ngrx/store';
import * as actions from './transfers-default-account.actions';
import {
  initialTransfersDefaultAccount,
  TransfersDefaultAccountState
} from '@modules/transfers/pages/transfers-default-account/store/transfers-default-account.state';

const featureReduce = createReducer(
  initialTransfersDefaultAccount,
  on(actions.fetchDefaultAccountAction, (state) => ({
    ...state,
    defaultAccount: null,
    working: true,
    completed: false
  })),
  on(actions.fetchDefaultAccountSuccessAction, (state, { defaultAccount }) => ({
    ...state,
    defaultAccount,
    working: false,
    completed: true
  })),
  on(actions.fetchDefaultAccountErrorAction, (state) => ({
    ...state,
    defaultAccount: null,
    working: false,
    completed: true
  }))
);

export const transfersDefaultAccountReducer = (
  state: TransfersDefaultAccountState | undefined,
  action: Action
): TransfersDefaultAccountState => featureReduce(state, action);
