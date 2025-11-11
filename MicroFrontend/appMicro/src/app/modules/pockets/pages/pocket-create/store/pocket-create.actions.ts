import { createAction, props } from '@ngrx/store';

import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { CreatePocketPayload } from '@modules/pockets/pages/pocket-create/entities/pocket-create.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { SuccessResponse } from '@commons/entities/response/response.interface';

export const pocketCreateAction = createAction(
  type('[Global/API] Pocket create'),
  props<{ payload: CreatePocketPayload; data: AlertStepData }>()
);

export const pocketCreateSuccessAction = createAction(
  type('[Global/API] Pocket create success'),
  props<{ response: SuccessResponse; items: VoucherItem[] }>()
);

export const pocketCreateErrorAction = createAction(
  type('[Global/API] Pocket create error'),
  props<{ props: AlertSheetProperties }>()
);
