import { DownloadProperties } from '@commons/entities/download/download.entities';
import { type } from '@commons/utils/util';
import { createAction, props } from '@ngrx/store';

export const downloadAction = createAction(
  type('[Global/UI] Download file'),
  props<{ props: DownloadProperties }>()
);

export const downloadSuccessAction = createAction(
  type('[Global/UI] Download file success')
);

export const downloadErrorAction = createAction(
  type('[Global/UI] Download file error'),
  props<{ message: string }>()
);

export const downloadCleanAction = createAction(
  type('[Global/UI] Download files clean')
);

export const toggleWorkingDownloadAction = createAction(
  type('[Download] Toggle working download'),
  props<{ working: boolean }>()
);
