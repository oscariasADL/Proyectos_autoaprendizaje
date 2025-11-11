import { mapPocketDetailData } from '@modules/pockets/helpers/pocket.helpers';
import { nicknamesSelector } from '@modules/product/store/product.selector';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  pocketDetailFeatureName,
  PocketDetailState
} from './pocket-detail.state';

const pocketDetailState = createFeatureSelector<PocketDetailState>(
  pocketDetailFeatureName
);

export const pocketDetailSelector = createSelector(
  pocketDetailState,
  (state: PocketDetailState) => state.pocket
);

export const pocketDetailWorkingSelector = createSelector(
  pocketDetailState,
  (state: PocketDetailState) => state.working
);

export const pocketDetailCompletedSelector = createSelector(
  pocketDetailState,
  (state: PocketDetailState) => state.completed
);

export const pocketDetailDataSelector = createSelector(
  pocketDetailSelector,
  nicknamesSelector,
  mapPocketDetailData
);
