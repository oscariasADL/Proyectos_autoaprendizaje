import { type } from '@commons/utils/util';
import { ShareProperties } from '@commons/entities/share/share.entities';
import { createAction, props } from '@ngrx/store';

export const shareAction = createAction(
  type('[Global/UI] Share file'),
  props<{ props: ShareProperties }>()
);

export const shareSuccessAction = createAction(
  type('[Global/UI] Share file success')
);

export const shareErrorAction = createAction(
  type('[Global/UI] Share file error'),
  props<{ message: string }>()
);

export const shareCleanAction = createAction(
  type('[Global/UI] Share file clean')
);

export const toggleWorkingShareAction = createAction(
  type('[Share] Toggle working share'),
  props<{ working: boolean }>()
);
