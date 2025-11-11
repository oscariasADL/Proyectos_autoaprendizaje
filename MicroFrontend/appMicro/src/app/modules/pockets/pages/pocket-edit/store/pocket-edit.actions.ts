import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { ToastProperties } from '@commons/entities/toast/toast.entities';
import { UpdatePocketPayload } from '@modules/pockets/entities/pocket-update.interface';
import { PocketDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { createAction, props } from '@ngrx/store';

export const pocketEditAction = createAction(
  type('[Global/API] Pocket edit'),
  props<{
    payload: UpdatePocketPayload;
    detail: PocketDetailPayload;
    backUrl: string;
  }>()
);

export const pocketEditSuccessAction = createAction(
  type('[Global/API] Pocket edit success'),
  props<{ props: ToastProperties }>()
);

export const pocketEditErrorAction = createAction(
  type('[Global/API] Pocket edit error'),
  props<{ props: AlertSheetProperties }>()
);
