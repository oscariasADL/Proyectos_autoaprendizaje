import { type } from '@commons/utils/util';
import { ConfigResponse } from '@commons/entities/config/config.entities';
import { createAction, props } from '@ngrx/store';

export const appLoadedAction = createAction(type('[Global/API] App loaded'));

export const fetchConfigAction = createAction(type('[Global/UI] Fetch config'));

export const fetchConfigSuccessAction = createAction(
  type('[Global/UI] Fetch config success'),
  props<{ config: ConfigResponse }>()
);

export const fetchConfigErrorAction = createAction(
  type('[Global/UI] Fetch config error'),
  props<{ message: string }>()
);

export const dispatchPingAction = createAction(
  type('[Global/API] Dispatch ping')
);

export const dispatchPingSuccessAction = createAction(
  type('[Global/API] Dispatch ping success')
);

export const dispatchPingErrorAction = createAction(
  type('[Global/API] Dispatch ping error')
);
