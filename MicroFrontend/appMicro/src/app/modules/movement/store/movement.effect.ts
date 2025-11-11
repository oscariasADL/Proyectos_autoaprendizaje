import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MovementsDetailResponse } from '@modules/movement/entities/movements-detail-payload.entity';
import { updateIonInfiniteScroll } from '@modules/movement/mappers/movements-paginate.mapper';
import { InfiniteScrollService } from '@modules/movement/services/infinite-scroll.service';
import { MovementService } from '@modules/movement/services/movement.service';
import { movementsHistorySelector } from '@modules/movement/store/movement.selector';
import { MovementState } from '@modules/movement/store/movement.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import * as actions from './movement.actions';

@Injectable()
export class MovementEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private service: MovementService,
    private store: Store<MovementState>,
    private infiniteScrollService: InfiniteScrollService
  ) {}

  fetchMovementsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchMovementsAction),
      switchMap((_) =>
        this.service.fetchMovements().pipe(
          map((movements) =>
            actions.fetchMovementsSuccessAction({ movements })
          ),
          catchError((response: HttpErrorResponse) =>
            of(
              actions.fetchMovementsErrorAction({
                message: response.message.toString()
              })
            )
          )
        )
      )
    )
  );

  fetchMovementsDetailEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchMovementsDetailAction),
      switchMap((action) =>
        this.service.fetchMovementsDetail(action.payload).pipe(
          map((response: MovementsDetailResponse) =>
            actions.fetchMovementsDetailSuccessAction({ response })
          ),
          catchError((response: HttpErrorResponse) =>
            of(
              actions.fetchMovementsDetailErrorAction({
                message: response.message.toString()
              })
            )
          )
        )
      )
    )
  );

  fetchMoreMovementsDetailEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchMoreMovementsDetailAction),
      withLatestFrom(this.store.pipe(select(movementsHistorySelector))),
      switchMap(([action, data]) =>
        this.service.fetchMovementsDetail(data.payload).pipe(
          map((response: MovementsDetailResponse) =>
            actions.fetchMovementsHistorySuccessAction({
              response: {
                ...response,
                results: data.response.results.concat(response.results)
              }
            })
          ),
          catchError((response: HttpErrorResponse) =>
            of(
              actions.fetchMovementsHistoryErrorAction({
                message: response.message.toString()
              })
            )
          ),
          tap(() =>
            updateIonInfiniteScroll(
              data.payload,
              data.response,
              this.infiniteScrollService.infiniteScroll
            )
          )
        )
      )
    )
  );

  fetchMovementsWithFiltersEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchMovementsWithFiltersAction),
      withLatestFrom(this.store.pipe(select(movementsHistorySelector))),
      switchMap(([action, data]) =>
        this.service.fetchMovementsDetail(data.payload).pipe(
          map((response: MovementsDetailResponse) =>
            actions.fetchMovementsHistorySuccessAction({ response })
          ),
          catchError((response: HttpErrorResponse) =>
            of(
              actions.fetchMovementsHistoryErrorAction({
                message: response.message.toString()
              })
            )
          ),
          tap((_action: any) => {
            let response: MovementsDetailResponse = {
              results: [],
              totalResults: 0
            };

            if (_action.hasOwnProperty('response')) {
              response = _action.response;
            }

            updateIonInfiniteScroll(
              data.payload,
              response,
              this.infiniteScrollService.infiniteScroll
            );
          })
        )
      )
    )
  );
}
