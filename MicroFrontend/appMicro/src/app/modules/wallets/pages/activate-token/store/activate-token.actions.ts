import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';

export const fetchLastTokenAction = createAction(
  type('[ACTIVATE_TOKEN] Fetch Last Token')
);

export const fetchLastTokenSuccessAction = createAction(
  type('[ACTIVATE_TOKEN] Fetch Last Token Success'),
  props<{ token: string }>()
);

export const fetchLastTokenErrorAction = createAction(
  type('[ACTIVATE_TOKEN] Fetch Last Token Failure'),
  props<{ error: string }>()
);

export const activateTokenAction = createAction(
  type('[ACTIVATE_TOKEN] Activate Token'),
  props<{ token: string }>()
);

export const activateTokenSuccessAction = createAction(
  type('[ACTIVATE_TOKEN] Activate Token Success')
);

export const activateTokenErrorAction = createAction(
  type('[ACTIVATE_TOKEN] Activate Token Failure'),
  props<{ error: string }>()
);
