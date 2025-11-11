import {
  walletsFeatureName,
  WalletsState
} from '@modules/wallets/store/wallets.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const walletsState = createFeatureSelector<WalletsState>(walletsFeatureName);

export const cardListSelector = createSelector(
  walletsState,
  (state: WalletsState) => state.cardList
);

export const walletCardListSelector = createSelector(
  walletsState,
  (state: WalletsState) => state.walletCardList
);

export const workingSelector = createSelector(
  walletsState,
  (state: WalletsState) => state.working
);

export const completedSelector = createSelector(
  walletsState,
  (state: WalletsState) => state.completed
);

export const walletIdSelector = createSelector(
  walletsState,
  (state: WalletsState) => state.walletId
);
