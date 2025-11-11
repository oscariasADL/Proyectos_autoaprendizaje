import { createReducer, Action, on } from '@ngrx/store';
import * as actions from './transfers-aval-key.actions';
import {
  initialTransfersAvalKeyState,
  TransfersAvalKeyState
} from '@modules/transfers/pages/transfers-aval-key/store/transfers-aval-key.state';

const featureReduce = createReducer(
  initialTransfersAvalKeyState,
  on(actions.fetchAccountAvalKeyAction, (state) => ({
    ...state,
    accountAvalKey: null,
    working: true,
    completed: false
  })),
  on(actions.fetchAccountAvalKeySuccessAction, (state, { accountAvalKey }) => ({
    ...state,
    accountAvalKey,
    working: false,
    completed: true
  })),
  on(actions.fetchAccountAvalKeyErrorAction, (state) => ({
    ...state,
    accountAvalKey: null,
    working: false,
    completed: true
  }))
);

export const transfersAvalKeyReducer = (
  state: TransfersAvalKeyState,
  action: Action
): TransfersAvalKeyState => featureReduce(state, action);
