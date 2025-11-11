import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { type } from '@commons/utils/util';
import { LoginType } from '@modules/auth/login/constants/login.constants';
import { createAction, props } from '@ngrx/store';
import { LoginUserPayload } from '../entities/login-user-payload.interface';
import { LoginUserResponse } from '../entities/login-user-response.interface';
import { DataBasicClientDto } from '@commons/entities/auth/auth.entities';

export const loginUserAction = createAction(
  type('[Global/API] Login user'),
  props<{ payload: LoginUserPayload }>()
);

export const loginUserSuccessAction = createAction(
  type('[Global/API] Login user success'),
  props<{ data: LoginUserResponse }>()
);

export const loginUserErrorAction = createAction(
  type('[Global/API] Login user error'),
  props<{ props: AlertSheetProperties }>()
);

export const fetchBasicDataAction = createAction(
  type('[Global/API] User data')
);

export const setBasicDataAction = createAction(
  type('[Global/API] Basic data Success'),
  props<{ data: DataBasicClientDto }>()
);

export const fetchBasicDataErrorAction = createAction(
  type('[Global/API] Basic data error'),
  props<{ message: string }>()
);

export const setLoginTypeAction = createAction(
  type('[Global/UI] Set login type'),
  props<{ loginType: LoginType }>()
);

export const inactiveChannelAction = createAction(
  type('[Global/UI] Inactive channel')
);

export const noProductsErrorAction = createAction(
  type('[Global/UI] No products error'),
  props<{ message: string }>()
);
export const invalidSeedAction = createAction(
  type('[Global/UI] No seed error')
);
