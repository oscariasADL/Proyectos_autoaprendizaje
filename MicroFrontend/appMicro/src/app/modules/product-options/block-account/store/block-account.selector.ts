import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  blockAccountFeatureName,
  BlockAccountState
} from '@modules/product-options/block-account/store/block-account.state';

const blockAccountState = createFeatureSelector<BlockAccountState>(
  blockAccountFeatureName
);

export const blockAccountWorkingSelector = createSelector(
  blockAccountState,
  (state: BlockAccountState) => state.working
);

export const blockAccountSelectedProductSelector = createSelector(
  blockAccountState,
  (state: BlockAccountState) => state.selectedProduct
);

export const blockAccountProductMediasSelector = createSelector(
  blockAccountState,
  (state: BlockAccountState) => state.productMedias
);

export const blockAccountFormSelector = createSelector(
  blockAccountState,
  (state: BlockAccountState) => state.blockAccountForm
);

export const blockAccountResponseSelector = createSelector(
  blockAccountState,
  (state: BlockAccountState) => state.response
);

export const blockAccountErrorSelector = createSelector(
  blockAccountState,
  (state: BlockAccountState) => state.error
);
