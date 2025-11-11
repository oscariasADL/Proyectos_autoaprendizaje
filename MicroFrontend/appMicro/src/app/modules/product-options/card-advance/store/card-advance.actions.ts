import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { CardAdvancePayload } from '@modules/product-options/card-advance/entities/card-advance.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { createAction, props } from '@ngrx/store';

export const cardAdvanceAction = createAction(
  type('[Global/API] Card advance'),
  props<{ payload: CardAdvancePayload; data: AlertStepData }>()
);

export const cardAdvanceSuccessAction = createAction(
  type('[Global/API] Card advance success'),
  props<{ props: AlertSheetProperties }>()
);

export const cardAdvanceErrorAction = createAction(
  type('[Global/API] Card advance error'),
  props<{ props: AlertSheetProperties }>()
);
