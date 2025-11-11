import { AlertProperties } from '@commons/entities/alert/alert.entities';
import { type } from '@commons/utils/util';
import { createAction, props } from '@ngrx/store';

export const alertAction = createAction(
  type('[Global/UI] Set alert'),
  props<{ payload?: AlertProperties }>()
);

export const AlertObserverActionsTypes = [];
