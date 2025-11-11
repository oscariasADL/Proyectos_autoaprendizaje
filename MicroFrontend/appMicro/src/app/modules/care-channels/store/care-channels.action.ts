import { type } from '@commons/utils/util';
import { createAction, props } from '@ngrx/store';
import { Adviser } from '../entities/adviser.interface';

export const fetchAdviserAction = createAction(
  type('[Global/API] fetch adviser')
);

export const fetchAdviserSuccessAction = createAction(
  type('[Global/API] fetch adviser success'),
  props<{ adviser: Adviser }>()
);

export const fetchAdviserErrorAction = createAction(
  type('[Global/API] fetch adviser error')
);
