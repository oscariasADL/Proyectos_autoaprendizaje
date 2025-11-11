import { ToastProperties } from '@commons/entities/toast/toast.entities';
import { type } from '@commons/utils/util';
import {
  ExtractPayload,
  ExtractsPeriod
} from '@modules/documents/pages/extracts/entities/extracts.interface';
import { createAction, props } from '@ngrx/store';

export const fetchPeriodsAction = createAction(
  type('[Global/API] Fetch periods'),
  props<{ id: string }>()
);

export const fetchPeriodsSuccessAction = createAction(
  type('[Global/API] Fetch periods success'),
  props<{ periods: ExtractsPeriod[] }>()
);

export const fetchPeriodsErrorAction = createAction(
  type('[Global/API] Fetch periods error'),
  props<{ message: string }>()
);

export const fetchExtractAction = createAction(
  type('[Global/API] Fetch extract'),
  props<{ payload: ExtractPayload }>()
);

export const fetchExtractSuccessAction = createAction(
  type('[Global/API] Fetch extract success')
);

export const fetchExtractErrorAction = createAction(
  type('[Global/API] Fetch extract error'),
  props<{ message: string; props: ToastProperties }>()
);
