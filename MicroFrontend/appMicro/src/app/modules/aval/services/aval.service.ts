import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Balance } from '@commons/entities/product/balance.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import {
  AvalStocks,
  StockDetailPayload,
  StockDetailResponse
} from '@modules/aval/entities/stocks.interface';
import { TuplusProduct } from '@modules/aval/entities/tuplus.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AvalService {
  constructor(private http: HttpClient) {}

  public fetchAvalProducts(code: string): Observable<{ data: Balance[] }> {
    const url =
      urlBuilder.services(ENV.api.services.base.aval_balance) +
      `?bankCode=${code}`;

    return this.http.get<{ data: Balance[] }>(url);
  }

  public fetchTuplusProducts(): Observable<TuplusProduct> {
    const url = urlBuilder.services(ENV.api.services.base.aval_tuplus);
    return this.http.get<TuplusProduct>(url);
  }

  public fetchStockProducts(): Observable<AvalStocks> {
    const url = urlBuilder.services(ENV.api.services.base.aval_stocks);
    return this.http.get<AvalStocks>(url);
  }

  public fetchStockDetail(
    payload: StockDetailPayload
  ): Observable<StockDetailResponse> {
    const url = urlBuilder.services(ENV.api.services.base.aval_stocks);
    return this.http.post<StockDetailResponse>(url, payload);
  }
}
