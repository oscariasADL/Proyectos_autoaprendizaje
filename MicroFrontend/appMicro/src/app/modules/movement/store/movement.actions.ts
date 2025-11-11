import { type } from '@commons/utils/util';
import { Movement } from '@commons/entities/product/movement.interface';
import {
  MovementsDetailPayload,
  MovementsDetailPayloadParams,
  MovementsDetailResponse
} from '@modules/movement/entities/movements-detail-payload.entity';
import { createAction, props } from '@ngrx/store';

export const fetchMovementsAction = createAction(
  type('[Global/API] Fetch movement')
);

export const fetchMovementsSuccessAction = createAction(
  type('[Global/API] Fetch movement success'),
  props<{ movements: Movement[] }>()
);

export const fetchMovementsErrorAction = createAction(
  type('[Global/API] Fetch movement error'),
  props<{ message: string }>()
);

export const fetchMovementsDetailAction = createAction(
  type('[Global/API] Fetch movements detail'),
  props<{ payload: MovementsDetailPayload }>()
);

export const fetchMovementsDetailSuccessAction = createAction(
  type('[Global/API] Fetch movements detail success'),
  props<{ response: MovementsDetailResponse }>()
);

export const fetchMovementsDetailErrorAction = createAction(
  type('[Global/API] Fetch movements detail error'),
  props<{ message: string }>()
);

export const resetMovementsDetailAction = createAction(
  type('[Global/UI] Reset movements detail')
);

export const fetchMovementsWithFiltersAction = createAction(
  type('[Global/API] Fetch movements with filters'),
  props<{ params: MovementsDetailPayloadParams }>()
);

export const fetchMoreMovementsDetailAction = createAction(
  type('[Global/API] Fetch more movements detail')
);

export const resetMovementsHistoryAction = createAction(
  type('[Global/UI] Reset movements history')
);

export const fetchMovementsHistorySuccessAction = createAction(
  type('[Global/API] Fetch movements history success'),
  props<{ response: MovementsDetailResponse }>()
);

export const fetchMovementsHistoryErrorAction = createAction(
  type('[Global/API] Fetch movements history error'),
  props<{ message: string }>()
);
