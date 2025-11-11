import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { AvalProductList } from '@modules/aval/entities/aval-product.interface';
import {
  AvalStocks,
  StockDetailPayload,
  StockDetailResponse
} from '@modules/aval/entities/stocks.interface';
import { TuplusProduct } from '@modules/aval/entities/tuplus.interface';
import {
  fetchAvalProductsAction,
  fetchAvalStocksDetailAction
} from '@modules/aval/store/aval.actions';
import {
  avalProductsCompletedSelector,
  avalProductsSelector,
  avalProductsWorkingSelector,
  stocksDetailCompletedSelector,
  stocksDetailSelector,
  stocksDetailWorkingSelector,
  stocksSelector,
  tuplusSelector,
  tuplusWorkingSelector
} from '@modules/aval/store/aval.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class AvalFacade extends AppFacade {
  public avalProducts$: Observable<AvalProductList[]> = this.store.pipe(
    select(avalProductsSelector)
  );

  public avalProductsWorking$: Observable<boolean> = this.store.pipe(
    select(avalProductsWorkingSelector)
  );

  public avalProductsCompleted$: Observable<boolean> = this.store.pipe(
    select(avalProductsCompletedSelector)
  );

  public tuplus$: Observable<TuplusProduct> = this.store.pipe(
    select(tuplusSelector)
  );

  public tuplusWorking$: Observable<boolean> = this.store.pipe(
    select(tuplusWorkingSelector)
  );

  public stocks$: Observable<AvalStocks> = this.store.pipe(
    select(stocksSelector)
  );

  public stocksDetail$: Observable<StockDetailResponse> = this.store.pipe(
    select(stocksDetailSelector)
  );

  public stocksDetailWorking$: Observable<boolean> = this.store.pipe(
    select(stocksDetailWorkingSelector)
  );

  public stocksDetailCompleted$: Observable<boolean> = this.store.pipe(
    select(stocksDetailCompletedSelector)
  );

  public fetchAvalProducts(code: string): void {
    this.store.dispatch(fetchAvalProductsAction({ code }));
  }

  public fetchAvalStocksDetail(payload: StockDetailPayload): void {
    this.store.dispatch(fetchAvalStocksDetailAction({ payload }));
  }
}
