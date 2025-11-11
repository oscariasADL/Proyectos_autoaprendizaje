import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import { FavoritePayload } from '@modules/favorites/entities/favorites.interface';
import { ToastProperties } from '@commons/entities/toast/toast.entities';

export const favoriteEditAction = createAction(
  type('[Favorites] Favorite edit'),
  props<{ payload: FavoritePayload }>()
);

export const favoriteEditBackgroundAction = createAction(
  type('[Favorites] Favorite edit background'),
  props<{ payload: FavoritePayload }>()
);

export const favoriteEditSuccessAction = createAction(
  type('[Favorites] Favorite edit success')
);

export const favoriteEditErrorAction = createAction(
  type('[Favorites] Favorite edit error'),
  props<{ props: ToastProperties }>()
);
