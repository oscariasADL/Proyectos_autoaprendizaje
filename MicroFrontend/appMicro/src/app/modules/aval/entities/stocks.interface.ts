export interface AvalStocks {
  stockType: string[];
}

export interface StockDetailPayload {
  date: string;
  type: string;
}

export interface StockDetailResponse {
  stockDetailList: StockDetailList[];
  paymentStockDetail: PaymentStockDetailList[];
}

export interface StockDetailList {
  type: string;
  amount: string;
  date: string;
  description: string;
}

export interface PaymentStockDetailList {
  channel: number;
  amount: string;
}

export type StockType = 'O' | 'P';

export enum STOCK_TYPES_LIST {
  'O' = 'AVAL.STOCKS.STOCK_TYPES_LIST.ORDINARY',
  'P' = 'AVAL.STOCKS.STOCK_TYPES_LIST.PREFERENTIAL'
}

export enum STOCK_TYPES_PLURAL {
  'O' = 'AVAL.STOCKS.STOCK_TYPES_PLURAL.ORDINARY',
  'P' = 'AVAL.STOCKS.STOCK_TYPES_PLURAL.PREFERENTIAL'
}

export const CHANNEL = {
  1: 'AVAL.STOCKS.CHANNEL.1',
  2: 'AVAL.STOCKS.CHANNEL.2',
  3: 'AVAL.STOCKS.CHANNEL.3',
  4: 'AVAL.STOCKS.CHANNEL.4',
  5: 'AVAL.STOCKS.CHANNEL.5'
};

export const STOCKS_MONTHS_BEFORE = 2;
