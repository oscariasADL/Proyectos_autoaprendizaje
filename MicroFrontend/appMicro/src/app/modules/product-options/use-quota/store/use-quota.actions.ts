import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { createAction, props } from '@ngrx/store';
import { UseQuotaPayload } from '@modules/product-options/use-quota/entities/use-quota.interface';

export const useQuotaAction = createAction(
  type('[Global/API] Use quota'),
  props<{ payload: UseQuotaPayload; data: AlertStepData }>()
);

export const useQuotaSuccessAction = createAction(
  type('[Global/API] Use quota success'),
  props<{ props: AlertSheetProperties }>()
);

export const useQuotaErrorAction = createAction(
  type('[Global/API] Use quota error'),
  props<{ props: AlertSheetProperties }>()
);
