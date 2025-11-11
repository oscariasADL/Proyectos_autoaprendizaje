import { type } from '@commons/utils/util';
import { PocketWithReturns } from '@modules/pockets/entities/pockets.interface';
import { PocketWithReturnsDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { createAction, props } from '@ngrx/store';
import { PocketMovementPayload } from '../../pocket-movements/entities/pocket-movements.interface';
import { PocketMovement } from '@app/commons/entities/product/movement.interface';
import { ToastProperties } from '@app/commons/entities/toast/toast.entities';
import { AlertSheetProperties } from '@app/commons/entities/alert/alert-sheet.entities';
import {
  PocketDetailPayload,
  UpdatePocketWithReturnsPayload
} from '../entities/pocket-detail.interface';
import { PocketModificationType } from '../mappers/pocket-wit-returns.mapper';

export const fetchPocketWithReturnsDetailAction = createAction(
  type('[POCKETS WITH RETURNS/DETAIL] Fetch pocket detail with returns'),
  props<{ payload: PocketWithReturnsDetailPayload }>()
);

export const fetchPocketDetailWithReturnsSuccessAction = createAction(
  type(
    '[POCKETS WITH RETURNS/DETAIL] Fetch pocket detail with returns success'
  ),
  props<{ pocket: PocketWithReturns }>()
);

export const fetchPocketDetailWithReturnsErrorAction = createAction(
  type('[POCKETS WITH RETURNS/DETAIL] Fetch pocket detailwith returns  error'),
  props<{ message: string }>()
);

export const updatePocketWithReturnsStatusAction = createAction(
  type('[POCKETS WITH RETURNS/API] Update pocket status'),
  props<{
    payload: UpdatePocketWithReturnsPayload;
    pocketModificationType: PocketModificationType;
  }>()
);

export const updatePocketWithReturnsStatusSuccessAction = createAction(
  type('[POCKETS WITH RETURNS/API] Update pocket status success'),
  props<{ props: ToastProperties }>()
);

export const updatePocketWithReturnsStatusErrorAction = createAction(
  type('[POCKETS WITH RETURNS/API] Update pocket status error'),
  props<{ props: AlertSheetProperties }>()
);

export const fetchPocketWithReturnsMovementsAction = createAction(
  type('[POCKETS WITH RETURNS/MOVEMENTS] Fetch pocket with returns movements'),
  props<{ payload: PocketMovementPayload }>()
);

export const fetchPocketWithReturnsMovementsSuccessAction = createAction(
  type(
    '[POCKETS WITH RETURNS/MOVEMENTS] Fetch pockets with returns movements success'
  ),
  props<{ movements: PocketMovement[] }>()
);

export const fetchPocketWithReturnsMovementsErrorAction = createAction(
  type(
    '[POCKETS WITH RETURNS/MOVEMENTS] Fetch pockets with returns movements error'
  ),
  props<{ message: string }>()
);

export const pocketWithReturnsDeleteAction = createAction(
  type('[POCKETS WITH RETURNS/DELETE] Delete pocket with returns'),
  props<{ payload: PocketDetailPayload }>()
);

export const pocketWithReturnsDeleteSuccessAction = createAction(
  type('[POCKETS WITH RETURNS/DELETE] Delete pocket   with returns success'),
  props<{ props: ToastProperties }>()
);

export const pocketWithReturnsDeleteErrorAction = createAction(
  type('[POCKETS WITH RETURNS/DELETE] Delete  pocket with returnserror'),
  props<{ props: AlertSheetProperties }>()
);
