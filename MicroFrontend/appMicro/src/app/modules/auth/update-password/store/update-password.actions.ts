import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { type } from '@commons/utils/util';
import { UpdatePasswordPayload } from '@modules/auth/update-password/entities/update-password.interface';
import { createAction, props } from '@ngrx/store';

export const updatePasswordAction = createAction(
  type('[Global/API] Update password'),
  props<{ payload: UpdatePasswordPayload }>()
);

export const updatePasswordSuccessAction = createAction(
  type('[Global/API] Update password success')
);

export const updatePasswordErrorAction = createAction(
  type('[Global/API] Update password error'),
  props<{ props: AlertSheetProperties }>()
);

export const resetUpdatePasswordAction = createAction(
  type('[Global/API] Reset update password')
);
