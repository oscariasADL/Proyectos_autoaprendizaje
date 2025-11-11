import {
  ACTION_LABEL,
  Favorite,
  FavoriteBasic
} from '@modules/favorites/entities/favorites.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

export function mapFavoritesHome(favorites: Favorite[]): Favorite[] {
  return favorites.map((favorite) => {
    return favorite;
  });
}

export function mapFavoritesHomeBasic(favorites: Favorite[]): FavoriteBasic[] {
  if (!isNullOrUndefined(favorites)) {
    return favorites.map((favorite) => ({
      keyFavorite: favorite.keyFavorite,
      nameFavoriteTransaction: favorite.nameFavoriteTransaction,
      identificationFavoriteType: favorite.identificationFavoriteType
    }));
  }
  return null;
}
