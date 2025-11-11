import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { ToastProperties } from '@commons/entities/toast/toast.entities';
import { createAction, props } from '@ngrx/store';
import { UpdatePocketWithReturnsPayload } from '../../pocket-detail-with-returns/entities/pocket-detail.interface';
import { PocketWithReturnsDetailPayload } from '../../pocket-detail/entities/pocket-detail.interface';

export const pocketWithReturnsEditAction = createAction(
  type('[POCKET WITH RETURNS/EDIT] Pocket with returns edit'),
  props<{
    payload: UpdatePocketWithReturnsPayload;
    detail: PocketWithReturnsDetailPayload;
    backUrl: string;
  }>()
);

export const pocketWithReturnsEditSuccessAction = createAction(
  type('[POCKET WITH RETURNS/EDIT] Pocket with returns edit success'),
  props<{ props: ToastProperties }>()
);

export const pocketWithReturnsEditErrorAction = createAction(
  type('[POCKET WITH RETURNS/EDIT] Pocket with returns edit error'),
  props<{ props: AlertSheetProperties }>()
);
