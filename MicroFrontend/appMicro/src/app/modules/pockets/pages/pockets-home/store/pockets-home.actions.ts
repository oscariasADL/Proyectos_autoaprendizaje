import { PocketsComplete } from '@modules/pockets/entities/pockets.interface';
import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';

export const fetchPocketsAction = createAction(
  type('[Global/API] Fetch pockets')
);

export const fetchPocketsSuccessAction = createAction(
  type('[Global/API] Fetch pockets success'),
  props<{ pockets: PocketsComplete }>()
);

export const fetchPocketsErrorAction = createAction(
  type('[Global/API] Fetch pockets error'),
  props<{ message: string }>()
);
