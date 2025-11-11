import { Favorite } from '@modules/favorites/entities/favorites.interface';

export const favoritesDetailFeatureName = 'favoritesDetailModuleState';

export type FavoritesDetailState = Readonly<{
  favorite: Favorite;
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialFavoriteDetailState: FavoritesDetailState = {
  favorite: null,
  working: false,
  completed: false,
  message: ''
};
