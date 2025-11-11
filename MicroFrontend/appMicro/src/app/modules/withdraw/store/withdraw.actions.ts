import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { type } from '@commons/utils/util';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { WithdrawPayload } from '@modules/withdraw/entities/withdraw.interface';
import { createAction, props } from '@ngrx/store';

export const withdrawAction = createAction(
  type('[Global/API] Withdraw'),
  props<{ payload: WithdrawPayload; data: AlertStepData }>()
);

export const withdrawSuccessAction = createAction(
  type('[Global/API] Withdraw success'),
  props<{ props: AlertSheetProperties }>()
);

export const withdrawErrorAction = createAction(
  type('[Global/API] Withdraw error'),
  props<{ props: AlertSheetProperties }>()
);
