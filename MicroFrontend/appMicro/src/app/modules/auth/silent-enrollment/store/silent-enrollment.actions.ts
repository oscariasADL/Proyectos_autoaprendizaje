import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { type } from '@commons/utils/util';
import { createAction, props } from '@ngrx/store';
import {
  SilentEnrollmentPayload,
  SilentEnrollmentResponse
} from '../entities/silent-enrollment.interface';

export const runSilentEnrollmentAction = createAction(
  type('[Global/API] Run silent enrollment'),
  props<{ payload: SilentEnrollmentPayload }>()
);

export const runSilentEnrollmentSuccessAction = createAction(
  type('[Global/API] Run silent enrollment success'),
  props<{ data: SilentEnrollmentResponse }>()
);

export const runSilentEnrollmentErrorAction = createAction(
  type('[Global/API] Run silent enrollment error'),
  props<{ props: AlertSheetProperties }>()
);

export const silentEnrollmentCompletedAction = createAction(
  type('[Global/API] Run silent enrollment completed')
);
