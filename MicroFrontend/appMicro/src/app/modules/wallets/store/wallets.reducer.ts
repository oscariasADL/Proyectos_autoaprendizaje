import { Action, createReducer, on } from '@ngrx/store';

import {
  initialWalletsState,
  WalletsState
} from '@modules/wallets/store/wallets.state';
import * as actions from '@modules/wallets/store/wallets.actions';

const featureReducer = createReducer(
  initialWalletsState,
  on(actions.setWalletIdAction, (state, { walletId }) => ({
    ...state,
    walletId
  })),
  on(actions.fetchCardListAction, (state) => ({
    ...state,
    cardList: [],
    walletCardList: [],
    working: true,
    completed: false
  })),
  on(actions.fetchCardListSuccessAction, (state, { cardList }) => ({
    ...state,
    cardList,
    working: false,
    completed: true
  })),
  on(actions.fetchCardListErrorAction, (state, { error }) => ({
    ...state,
    cardList: [],
    working: false,
    completed: true,
    message: error
  })),
  on(actions.cardEnrollmentProcessAction, (state) => ({
    ...state,
    working: true,
    completed: false
  })),
  on(actions.cardEnrollmentProcessSuccessAction, (state) => ({
    ...state,
    working: false,
    completed: true
  })),
  on(actions.prepareCardsAction, (state) => ({
    ...state,
    walletCardList: [],
    working: true,
    completed: false
  })),
  on(actions.prepareCardsSuccessAction, (state, { walletCardList }) => ({
    ...state,
    walletCardList,
    working: false,
    completed: true
  })),
  on(actions.fetchCardListErrorAction, (state, { error }) => ({
    ...state,
    walletCardList: [],
    working: false,
    completed: true,
    message: error
  }))
);

export const walletsReducer = (
  state: WalletsState,
  action: Action
): WalletsState => featureReducer(state, action);
