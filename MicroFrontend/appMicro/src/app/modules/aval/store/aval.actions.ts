import { type } from '@commons/utils/util';
import { Balance } from '@commons/entities/product/balance.interface';
import {
  AvalStocks,
  StockDetailPayload,
  StockDetailResponse
} from '@modules/aval/entities/stocks.interface';
import { TuplusProduct } from '@modules/aval/entities/tuplus.interface';
import { createAction, props } from '@ngrx/store';

export const fetchAvalProductsAction = createAction(
  type('[Global/API] Fetch Aval products'),
  props<{ code: string }>()
);

export const fetchAvalProductsSuccessAction = createAction(
  type('[Global/API] Fetch Aval products success'),
  props<{ data: Balance[] }>()
);

export const fetchAvalProductsErrorAction = createAction(
  type('[Global/API] Fetch Aval products error')
);

export const fetchTuplusProductsAction = createAction(
  type('[Global/API] Fetch Tuplus products')
);

export const fetchTuplusProductsSuccessAction = createAction(
  type('[Global/API] Fetch Tuplus products success'),
  props<{ data: TuplusProduct }>()
);

export const fetchTuplusProductsErrorAction = createAction(
  type('[Global/API] Fetch Tuplus products error')
);

export const fetchAvalStocksAction = createAction(
  type('[Global/API] Fetch Aval stocks')
);

export const fetchAvalStocksSuccessAction = createAction(
  type('[Global/API] Fetch Aval stocks success'),
  props<{ data: AvalStocks }>()
);

export const fetchAvalStocksErrorAction = createAction(
  type('[Global/API] Fetch Aval stocks error')
);

export const fetchAvalStocksDetailAction = createAction(
  type('[Global/API] Fetch Aval stocks detail'),
  props<{ payload: StockDetailPayload }>()
);

export const fetchAvalStocksDetailSuccessAction = createAction(
  type('[Global/API] Fetch Aval stocks detail success'),
  props<{ data: StockDetailResponse }>()
);

export const fetchAvalStocksDetailErrorAction = createAction(
  type('[Global/API] Fetch Aval stocks detail error')
);
