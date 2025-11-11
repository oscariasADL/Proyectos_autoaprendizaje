import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { ToastProperties } from '@commons/entities/toast/toast.entities';
import { UpdatePocketPayload } from '@modules/pockets/entities/pocket-update.interface';
import { PocketDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { createAction, props } from '@ngrx/store';

export const updatePocketStatusAction = createAction(
  type('[Global/API] Update pocket status'),
  props<{ payload: UpdatePocketPayload; detail: PocketDetailPayload }>()
);

export const updatePocketStatusSuccessAction = createAction(
  type('[Global/API] Update pocket status success'),
  props<{ props: ToastProperties }>()
);

export const updatePocketStatusErrorAction = createAction(
  type('[Global/API] Update pocket status error'),
  props<{ props: AlertSheetProperties }>()
);
