import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  pocketWithReturnsFeatureName,
  PocketWithReturnsState
} from './create-pocket-with-returns.state';

const pocketWithReturnsState = createFeatureSelector<PocketWithReturnsState>(
  pocketWithReturnsFeatureName
);

export const pocketWithReturnsSelector = createSelector(
  pocketWithReturnsState,
  (state: PocketWithReturnsState) => state
);
