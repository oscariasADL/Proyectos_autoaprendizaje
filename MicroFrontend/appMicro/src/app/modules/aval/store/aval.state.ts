import { Balance } from '@commons/entities/product/balance.interface';
import {
  AvalStocks,
  StockDetailResponse
} from '@modules/aval/entities/stocks.interface';
import { TuplusProduct } from '@modules/aval/entities/tuplus.interface';

export const avalFeatureName = 'avalModuleState';

export type AvalProductsState = Readonly<{
  data: Balance[];
  working: boolean;
  completed: boolean;
}>;

export type TuplusState = Readonly<{
  data: TuplusProduct;
  working: boolean;
  completed: boolean;
}>;

export type StocksState = Readonly<{
  data: AvalStocks;
  working: boolean;
  completed: boolean;
}>;

export type StocksDetailState = Readonly<{
  data: StockDetailResponse;
  working: boolean;
  completed: boolean;
}>;

export type AvalState = Readonly<{
  products: AvalProductsState;
  tuplus: TuplusState;
  stocks: StocksState;
  stocksDetail: StocksDetailState;
}>;

export const initialAvalState: AvalState = {
  products: {
    data: null,
    working: false,
    completed: false
  },
  tuplus: {
    data: null,
    working: false,
    completed: false
  },
  stocks: {
    data: null,
    working: false,
    completed: false
  },
  stocksDetail: {
    data: null,
    working: false,
    completed: false
  }
};
