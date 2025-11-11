import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import { PocketMovementPayload } from '@modules/pockets/pages/pocket-movements/entities/pocket-movements.interface';
import { PocketMovement } from '@app/commons/entities/product/movement.interface';

export const fetchPocketMovementsAction = createAction(
  type('[POCKETS/MOVEMENTS] Fetch pocket movements'),
  props<{ payload: PocketMovementPayload }>()
);

export const fetchPocketMovementsSuccessAction = createAction(
  type('[POCKETS/MOVEMENTS] Fetch pockets movements success'),
  props<{ movements: PocketMovement[] }>()
);

export const fetchPocketMovementsErrorAction = createAction(
  type('[POCKETS/MOVEMENTS] Fetch pockets movements error'),
  props<{ message: string }>()
);
