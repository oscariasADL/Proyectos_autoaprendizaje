import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { type } from '@commons/utils/util';
import {
  RegisterPayload,
  RegisterResponse
} from '@modules/auth/register/entities/register.interface';
import { createAction, props } from '@ngrx/store';

export const runRegisterAction = createAction(
  type('[Global/API] Run register'),
  props<{ payload: RegisterPayload }>()
);

export const runRegisterSuccessAction = createAction(
  type('[Global/API] Run register success'),
  props<{ data: RegisterResponse }>()
);

export const runRegisterErrorAction = createAction(
  type('[Global/API] Run register error'),
  props<{ props: AlertSheetProperties }>()
);

export const runRegisterErrorNotModalAction = createAction(
  type('[Global/API] register error not modal'),
  props<{ props: AlertSheetProperties }>()
);
