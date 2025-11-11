import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  transfersCel2celFeatureName,
  TransfersCel2celState
} from './transfers-cel2cel-send.state';

const transfersCel2celState = createFeatureSelector<TransfersCel2celState>(
  transfersCel2celFeatureName
);

export const transfersCel2celTowardProductsSelector = createSelector(
  transfersCel2celState,
  (state: TransfersCel2celState) => state.towardProducts
);

export const transfersCel2celTowardBankIdsSelector = createSelector(
  transfersCel2celState,
  (state: TransfersCel2celState) => state.towardBankIds
);

export const transfersCel2celWorkingSelector = createSelector(
  transfersCel2celState,
  (state: TransfersCel2celState) => state.working
);

export const transfersCel2celCompletedSelector = createSelector(
  transfersCel2celState,
  (state: TransfersCel2celState) => state.completed
);

export const transfersCel2celMessageSelector = createSelector(
  transfersCel2celState,
  (state: TransfersCel2celState) => state.message
);

export const transfersCel2celUseTransfiyaSelector = createSelector(
  transfersCel2celState,
  (state: TransfersCel2celState) => state?.useTransfiya
);
