import { type } from '@commons/utils/util';
import { ChangePasswordPayload } from '@modules/change-password/entities/change-password.entities';
import { createAction, props } from '@ngrx/store';

export const changePasswordAction = createAction(
  type('[Global/API] Change password'),
  props<{ payload: ChangePasswordPayload }>()
);

export const changePasswordSuccessAction = createAction(
  type('[Global/API] Change password success')
);

export const changePasswordErrorAction = createAction(
  type('[Global/API] Change password error'),
  props<{ message: string; errorCode: string }>()
);
