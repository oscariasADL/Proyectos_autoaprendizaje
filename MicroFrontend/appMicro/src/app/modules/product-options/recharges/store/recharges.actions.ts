import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { RechargePayload } from '@modules/product-options/recharges/entities/recharges.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { createAction, props } from '@ngrx/store';

export const rechargeAction = createAction(
  type('[Global/API] Recharge'),
  props<{ payload: RechargePayload; data: AlertStepData }>()
);

export const rechargeSuccessAction = createAction(
  type('[Global/API] Recharge success'),
  props<{ props: AlertSheetProperties }>()
);

export const rechargeErrorAction = createAction(
  type('[Global/API] Recharge error'),
  props<{ props: AlertSheetProperties }>()
);
