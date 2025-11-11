import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { type } from '@commons/utils/util';
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse
} from '@modules/auth/forgot-password/entities/forgot-password.interface';
import { createAction, props } from '@ngrx/store';

export const runForgotPasswordAction = createAction(
  type('[Global/API] Run forgot password'),
  props<{ payload: ForgotPasswordPayload }>()
);

export const runForgotPasswordSuccessAction = createAction(
  type('[Global/API] Run forgot password success'),
  props<{ data: ForgotPasswordResponse }>()
);

export const runForgotPasswordErrorAction = createAction(
  type('[Global/API] Run forgot password error'),
  props<{ props: AlertSheetProperties }>()
);
