import { Injectable } from '@angular/core';
import { AvalProductList } from '@modules/aval/entities/aval-product.interface';
import {
  AvalStocks,
  StockDetailPayload,
  StockDetailResponse
} from '@modules/aval/entities/stocks.interface';
import { TuplusProduct } from '@modules/aval/entities/tuplus.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AvalFacadeMock extends AppFacadeMock {
  public avalProducts$: Observable<AvalProductList[]> = new BehaviorSubject(
    null
  );

  public avalProductsWorking$: Observable<boolean> = new BehaviorSubject(false);

  public avalProductsCompleted$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public tuplus$: Observable<TuplusProduct> = new BehaviorSubject(null);

  public tuplusWorking$: Observable<boolean> = new BehaviorSubject(false);

  public stocks$: Observable<AvalStocks> = new BehaviorSubject({
    stockType: []
  });

  public stocksDetail$: Observable<StockDetailResponse> = new BehaviorSubject(
    null
  );

  public stocksDetailWorking$: Observable<boolean> = new BehaviorSubject(false);

  public stocksDetailCompleted$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public fetchAvalProducts(code: string): void {}

  public fetchAvalStocksDetail(payload: StockDetailPayload): void {}
}
