import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import {
  FavoritePayload,
  SubtypeOperations
} from '@modules/favorites/entities/favorites.interface';
import { ToastProperties } from '@commons/entities/toast/toast.entities';

export const favoriteCreateAction = createAction(
  type('[Global/API] Favorite create'),
  props<{ payload: FavoritePayload }>()
);

export const favoriteCreateSuccessAction = createAction(
  type('[Global/API] Favorite create success'),
  props<{ subType: SubtypeOperations }>()
);

export const favoriteCreateErrorAction = createAction(
  type('[Global/API] Favorite create error'),
  props<{ props: ToastProperties }>()
);
