import { Injectable } from '@angular/core';
import {
  AvalStocks,
  StockDetailResponse
} from '@modules/aval/entities/stocks.interface';
import { TuplusProduct } from '@modules/aval/entities/tuplus.interface';
import { AvalService } from '@modules/aval/services/aval.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as actions from './aval.actions';

@Injectable()
export class AvalEffect {
  constructor(private actions$: Actions, private service: AvalService) {}

  fetchAvalProductsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchAvalProductsAction),
      switchMap((action) =>
        this.service.fetchAvalProducts(action.code).pipe(
          map((response) =>
            actions.fetchAvalProductsSuccessAction({
              data: response?.data || []
            })
          ),
          catchError(() => of(actions.fetchAvalProductsErrorAction()))
        )
      )
    )
  );

  fetchTuplusProductsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchTuplusProductsAction),
      switchMap((_) =>
        this.service.fetchTuplusProducts().pipe(
          map((data: TuplusProduct) =>
            actions.fetchTuplusProductsSuccessAction({ data })
          ),
          catchError(() => of(actions.fetchTuplusProductsErrorAction()))
        )
      )
    )
  );

  fetchAvalStocksEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchAvalStocksAction),
      switchMap((_) =>
        this.service.fetchStockProducts().pipe(
          map((data: AvalStocks) =>
            actions.fetchAvalStocksSuccessAction({ data })
          ),
          catchError(() => of(actions.fetchAvalStocksErrorAction()))
        )
      )
    )
  );

  fetchAvalStocksDetailEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchAvalStocksDetailAction),
      switchMap(({ payload }) =>
        this.service.fetchStockDetail(payload).pipe(
          map((data: StockDetailResponse) =>
            actions.fetchAvalStocksDetailSuccessAction({ data })
          ),
          catchError(() => of(actions.fetchAvalStocksDetailErrorAction()))
        )
      )
    )
  );
}
