import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import { FavoriteDeletePayload } from '@modules/favorites/entities/favorites.interface';
import { ToastProperties } from '@commons/entities/toast/toast.entities';

export const showConfirmDeleteAction = createAction(
  type('[Global/API] Show confirm delete'),
  props<{ payload: FavoriteDeletePayload }>()
);

export const deleteFavoriteAction = createAction(
  type('[Global/API] Favorite delete'),
  props<{ payload: FavoriteDeletePayload }>()
);

export const deleteFavoritesSuccessAction = createAction(
  type('[Global/API] Delete favorites success')
);

export const deleteFavoritesErrorAction = createAction(
  type('[Global/API] Delete favorites error'),
  props<{ props: ToastProperties }>()
);
