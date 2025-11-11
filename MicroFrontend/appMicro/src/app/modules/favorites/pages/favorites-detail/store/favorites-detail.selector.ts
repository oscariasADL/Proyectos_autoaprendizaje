import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  favoritesDetailFeatureName,
  FavoritesDetailState
} from '@modules/favorites/pages/favorites-detail/store/favorites-detaill.state';

const favoritesDetailState = createFeatureSelector<FavoritesDetailState>(
  favoritesDetailFeatureName
);

export const favoriteDetailSelector = createSelector(
  favoritesDetailState,
  (state: FavoritesDetailState) => state.favorite
);

export const favoriteDetailWorkingSelector = createSelector(
  favoritesDetailState,
  (state: FavoritesDetailState) => state.working
);

export const favoriteDetailCompletedSelector = createSelector(
  favoritesDetailState,
  (state: FavoritesDetailState) => state.completed
);
