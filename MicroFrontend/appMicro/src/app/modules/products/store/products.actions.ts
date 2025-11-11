import { type } from '@commons/utils/util';
import { createAction, props } from '@ngrx/store';

export const setProductFilter = createAction(
  type('[Global/UI] Set product filter'),
  props<{ productFilter: number }>()
);
