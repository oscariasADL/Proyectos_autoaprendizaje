import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import { Favorite } from '@modules/favorites/entities/favorites.interface';
import { ToastProperties } from '@commons/entities/toast/toast.entities';

export const fetchFavoriteDetailAction = createAction(
  type('[Favorites] Fetch favorite detail'),
  props<{ keyFavorite: string }>()
);

export const fetchFavoriteDetailSuccessAction = createAction(
  type('[Favorites] Fetch favorite detail success'),
  props<{ favorite: Favorite }>()
);

export const fetchFavoriteDetailErrorAction = createAction(
  type('[Favorites] Fetch favorite detail error'),
  props<{ message: string }>()
);

export const setFavoriteDetailAction = createAction(
  type('[Favorites] set Favorite detail'),
  props<{ favorite: Favorite }>()
);
