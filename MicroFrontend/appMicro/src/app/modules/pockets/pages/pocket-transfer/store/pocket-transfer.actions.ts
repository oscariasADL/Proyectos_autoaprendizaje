import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { ToastProperties } from '@commons/entities/toast/toast.entities';
import { PocketDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { TransferPocketPayload } from '@modules/pockets/pages/pocket-transfer/entities/pocket-transfer.interface';
import { createAction, props } from '@ngrx/store';
import { PocketTypeEnum } from '@modules/pockets/entities/pockets.interface';

export const pocketTransferAction = createAction(
  type('[Global/API] Pocket transfer'),
  props<{
    payload: TransferPocketPayload;
    detail: PocketDetailPayload;
    pocketType: PocketTypeEnum;
    backUrl: string;
  }>()
);

export const pocketTransferSuccessAction = createAction(
  type('[Global/API] Pocket transfer success'),
  props<{ props: ToastProperties }>()
);

export const pocketTransferErrorAction = createAction(
  type('[Global/API] Pocket transfer error'),
  props<{ props: AlertSheetProperties }>()
);
