import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  activateTokenFeatureName,
  ActivateTokenState
} from '@modules/wallets/pages/activate-token/store/activate-token.state';

const activateTokenState = createFeatureSelector<ActivateTokenState>(
  activateTokenFeatureName
);

export const workingSelector = createSelector(
  activateTokenState,
  (state: ActivateTokenState) => state.working
);

export const completedSelector = createSelector(
  activateTokenState,
  (state: ActivateTokenState) => state.completed
);

export const isActivatedSelector = createSelector(
  activateTokenState,
  (state: ActivateTokenState) => state.isActivated
);
