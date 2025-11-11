import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import {
  CustomizeAvalTagPayload,
  CustomizeAvalTagResponse,
  RandomKeyPayload,
  RandomKeyResponse
} from '@modules/product-options/customize-aval-tag/entities/customize-aval-tag.interface';

export const modifyAvalTagAction = createAction(
  type('[CustomizeAvalTag] Modify Aval Tag'),
  props<{ payload: CustomizeAvalTagPayload }>()
);

export const modifyAvalTagSuccessAction = createAction(
  type('[CustomizeAvalTag] Modify Aval Tag Success'),
  props<{
    response: CustomizeAvalTagResponse;
    payload: CustomizeAvalTagPayload;
  }>()
);

export const modifyAvalTagErrorAction = createAction(
  type('[CustomizeAvalTag] Modify Aval Tag Error'),
  props<{ error: HttpErrorResponse; payload: CustomizeAvalTagPayload }>()
);
export const getRandomKeyAction = createAction(
  type('[CustomizeAvalTag] get Random Key'),
  props<{ payload: RandomKeyPayload }>()
);

export const getRandomKeySuccess = createAction(
  '[CustomizeAvalTag] Get Random Key Success',
  props<{ response: RandomKeyResponse }>()
);

export const getRandomKeyFailure = createAction(
  '[CustomizeAvalTag] Get Random Key Failure',
  props<{ error: any }>()
);
