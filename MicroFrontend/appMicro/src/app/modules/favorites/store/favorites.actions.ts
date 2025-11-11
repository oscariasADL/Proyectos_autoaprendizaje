import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import { Favorite } from '@modules/favorites/entities/favorites.interface';

export const fetchFavoritesAction = createAction(
  type('[Global/API] Fetch favorites')
);

export const fetchFavoritesSuccessAction = createAction(
  type('[Global/API] Fetch favorites success'),
  props<{ favorites: Favorite[] }>()
);

export const fetchFavoritesErrorAction = createAction(
  type('[Global/API] Fetch favorites error'),
  props<{ message: string }>()
);

export const fetchTowardProductsByPhoneNumberAction = createAction(
  type('[Favorites/API] Fetch cel2cel toward products by phone number'),
  props<{ phone: string }>()
);

export const fetchTowardProductsByPhoneNumberSuccessAction = createAction(
  type('[Favorites/API] Fetch cel2cel toward products by phone number success'),
  props<{ towardProducts: any[] }>()
);

export const fetchTowardProductsByPhoneNumberErrorAction = createAction(
  type('[Favorites/API] Fetch cel2cel toward products by phone number error'),
  props<{ message: string }>()
);
