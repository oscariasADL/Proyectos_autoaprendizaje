import {
  trustRelationFeatureName,
  TrustRelationState
} from '@modules/transfers/pages/transfers-trust-relation/store/transfers-trust-relation.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const trustRelationState = createFeatureSelector<TrustRelationState>(
  trustRelationFeatureName
);

export const trustRelationsSelector = createSelector(
  trustRelationState,
  (state: TrustRelationState) => state.data
);

export const trustRelationsWorkingSelector = createSelector(
  trustRelationState,
  (state: TrustRelationState) => state.working
);

export const trustRelationsCompletedSelector = createSelector(
  trustRelationState,
  (state: TrustRelationState) => state.completed
);
