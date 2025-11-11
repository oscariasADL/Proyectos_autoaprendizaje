import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  transfersDefaultAccountFeatureName,
  TransfersDefaultAccountState
} from '@modules/transfers/pages/transfers-default-account/store/transfers-default-account.state';

const transferDefaultAccountState =
  createFeatureSelector<TransfersDefaultAccountState>(
    transfersDefaultAccountFeatureName
  );

export const transferDefaultAccountDefaultAccountSelector = createSelector(
  transferDefaultAccountState,
  (state: TransfersDefaultAccountState) => state.defaultAccount
);

export const transferDefaultAccountWorkingSelector = createSelector(
  transferDefaultAccountState,
  (state: TransfersDefaultAccountState) => state.working
);

export const transferDefaultAccountCompletedSelector = createSelector(
  transferDefaultAccountState,
  (state: TransfersDefaultAccountState) => state.completed
);
