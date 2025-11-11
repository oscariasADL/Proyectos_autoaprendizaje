import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { ToastProperties } from '@commons/entities/toast/toast.entities';
import { PocketDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { createAction, props } from '@ngrx/store';

export const pocketDeleteAction = createAction(
  type('[Global/API] Delete pocket status'),
  props<{ payload: PocketDetailPayload }>()
);

export const pocketDeleteSuccessAction = createAction(
  type('[Global/API] Delete pocket status success'),
  props<{ props: ToastProperties }>()
);

export const pocketDeleteErrorAction = createAction(
  type('[Global/API] Delete pocket status error'),
  props<{ props: AlertSheetProperties }>()
);
