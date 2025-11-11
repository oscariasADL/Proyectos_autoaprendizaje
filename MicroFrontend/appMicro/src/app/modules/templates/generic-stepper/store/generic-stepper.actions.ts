import { GMFPayload, GMFData } from '@app/commons/entities/gmf/gmf.interface';
import { type } from '@commons/utils/util';
import { createAction, props } from '@ngrx/store';

export const fetchGMFAction = createAction(
  type('[GENERIC STEPPER] Fetch gmf'),
  props<{ payload: GMFPayload }>()
);

export const fetchGMFSuccessAction = createAction(
  type('[GENERIC STEPPER] Fetch gmf success'),
  props<{ gmf: GMFData }>()
);

export const fetchGMFErrorAction = createAction(
  type('[GENERIC STEPPER] Fetch gmf error'),
  props<{ message: string }>()
);
