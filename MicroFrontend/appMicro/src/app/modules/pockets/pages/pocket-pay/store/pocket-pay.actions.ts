import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { ToastProperties } from '@commons/entities/toast/toast.entities';
import { PocketDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { TransferPocketPayload } from '@modules/pockets/pages/pocket-transfer/entities/pocket-transfer.interface';
import { createAction, props } from '@ngrx/store';
import { Pocket } from '@app/modules/pockets/entities/pockets.interface';

export const pocketPayAction = createAction(
  type('[Global/API] Pocket pay'),
  props<{
    payload: TransferPocketPayload;
    pocket: Pocket;
    backUrl: string;
  }>()
);

export const pocketPaySuccessAction = createAction(
  type('[Global/API] Pocket pay success'),
  props<{ props: ToastProperties }>()
);

export const pocketPayErrorAction = createAction(
  type('[Global/API] Pocket pay error'),
  props<{ props: AlertSheetProperties }>()
);
