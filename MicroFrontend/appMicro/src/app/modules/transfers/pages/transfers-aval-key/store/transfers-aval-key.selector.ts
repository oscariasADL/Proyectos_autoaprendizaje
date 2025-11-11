import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  transfersAvalKeyFeatureName,
  TransfersAvalKeyState
} from '@modules/transfers/pages/transfers-aval-key/store/transfers-aval-key.state';

const transferAvalKeyState = createFeatureSelector<TransfersAvalKeyState>(
  transfersAvalKeyFeatureName
);

export const transferAvalKeyAccountAvalKeySelector = createSelector(
  transferAvalKeyState,
  (state: TransfersAvalKeyState) => state.accountAvalKey
);

export const transferAvalKeyWorkingSelector = createSelector(
  transferAvalKeyState,
  (state: TransfersAvalKeyState) => state.working
);

export const transferAvalKeyCompletedSelector = createSelector(
  transferAvalKeyState,
  (state: TransfersAvalKeyState) => state.completed
);
