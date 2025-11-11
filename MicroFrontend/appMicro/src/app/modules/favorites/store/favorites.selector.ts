import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  favoritesFeatureName,
  FavoritesState
} from '@modules/favorites/store/favorites.state';
import { mapFavoritesHomeBasic } from '@modules/favorites/pages/favorites-home/mappers/favorites-home.mapper';

const favoritesHomeState =
  createFeatureSelector<FavoritesState>(favoritesFeatureName);

export const favoritesHomeSelector = createSelector(
  favoritesHomeState,
  (state: FavoritesState) => state.favorites
);

export const favoritesWorkingSelector = createSelector(
  favoritesHomeState,
  (state: FavoritesState) => state.working
);

export const favoritesCompletedSelector = createSelector(
  favoritesHomeState,
  (state: FavoritesState) => state.completed
);

export const favoritesBasicSelector = createSelector(
  favoritesHomeState,
  (state: FavoritesState) => mapFavoritesHomeBasic(state.favorites)
);

export const oneFavoriteSelector = (keyFavorite: string) =>
  createSelector(favoritesHomeState, (state: FavoritesState) =>
    state.favorites.find((fav) => fav.keyFavorite === keyFavorite)
  );

export const cellToCellTransferProducts = createSelector(
  favoritesHomeState,
  (state: FavoritesState) => state.towardProducts
);

export const transfersCel2celTowardBankIdsSelector = createSelector(
  favoritesHomeState,
  (state: FavoritesState) => state.towardBankIds
);
