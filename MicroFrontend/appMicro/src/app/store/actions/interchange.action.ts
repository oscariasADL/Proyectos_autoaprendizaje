import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';

export const initInterchangeKeyAction = createAction(
  type('[Global/API] Init interchange key')
);

export const initInterchangeKeySuccessAction = createAction(
  type('[Global/API] Init interchange key success'),
  props<{ publicKey: string }>()
);

export const initInterchangeKeyErrorAction = createAction(
  type('[Global/API] Init interchange key error')
);

export const callingAgainToInterchangeKeyAction = createAction(
  type('[Global/API] Calling again to interchange key')
);

export const setInterchangeKeyTimeoutIdAction = createAction(
  type('[Global/API] Set interchange key timeout id '),
  props<{ timeoutId: number; date: Date }>()
);

export const interchangeKeyDataSuccessAction = createAction(
  type('[Global/API] Interchange key data success')
);
