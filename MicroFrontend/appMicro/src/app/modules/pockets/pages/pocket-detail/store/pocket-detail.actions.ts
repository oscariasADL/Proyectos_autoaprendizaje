import { type } from '@commons/utils/util';
import { Pocket } from '@modules/pockets/entities/pockets.interface';
import { PocketDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { createAction, props } from '@ngrx/store';

export const fetchPocketDetailAction = createAction(
  type('[Global/API] Fetch pocket detail'),
  props<{ payload: PocketDetailPayload }>()
);

export const fetchPocketDetailSuccessAction = createAction(
  type('[Global/API] Fetch pocket detail success'),
  props<{ pocket: Pocket }>()
);

export const fetchPocketDetailErrorAction = createAction(
  type('[Global/API] Fetch pocket detail error'),
  props<{ message: string }>()
);
