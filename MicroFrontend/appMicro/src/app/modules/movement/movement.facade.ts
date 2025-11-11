import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Movement } from '@commons/entities/product/movement.interface';
import {
  MovementsDetailPayload,
  MovementsDetailPayloadParams
} from '@modules/movement/entities/movements-detail-payload.entity';
import {
  fetchMoreMovementsDetailAction,
  fetchMovementsDetailAction,
  fetchMovementsWithFiltersAction,
  resetMovementsDetailAction,
  resetMovementsHistoryAction
} from '@modules/movement/store/movement.actions';
import {
  movementsDetailCompletedSelector,
  movementsDetailResultsSelector,
  movementsDetailWorkingSelector,
  movementsHistoryCompletedSelector,
  movementsHistoryPayloadSelector,
  movementsHistoryResultsSelector,
  movementsHistorySelector,
  movementsHistoryWorkingSelector
} from '@modules/movement/store/movement.selector';
import { MovementsHistoryState } from '@modules/movement/store/movement.state';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class MovementFacade extends AppFacade {
  public working$: Observable<boolean> = this.store.pipe(
    select(movementsDetailWorkingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(movementsDetailCompletedSelector)
  );

  public movements$: Observable<Movement[]> = this.store.pipe(
    select(movementsDetailResultsSelector)
  );

  public movementsHistory$: Observable<MovementsHistoryState> = this.store.pipe(
    select(movementsHistorySelector)
  );

  public movementsHistoryResults$: Observable<Movement[]> = this.store.pipe(
    select(movementsHistoryResultsSelector)
  );

  public movementsHistoryWorking$: Observable<boolean> = this.store.pipe(
    select(movementsHistoryWorkingSelector)
  );

  public movementsHistoryCompleted$: Observable<boolean> = this.store.pipe(
    select(movementsHistoryCompletedSelector)
  );

  public movementsHistoryPayload$: Observable<MovementsDetailPayload> =
    this.store.pipe(select(movementsHistoryPayloadSelector));

  public fetchMovementsDetail(payload: MovementsDetailPayload): void {
    this.store.dispatch(fetchMovementsDetailAction({ payload }));
  }

  public fetchMoreMovementsDetail(): void {
    this.store.dispatch(fetchMoreMovementsDetailAction());
  }

  public fetchMovementsWithFilters(params: MovementsDetailPayloadParams): void {
    this.store.dispatch(fetchMovementsWithFiltersAction({ params }));
  }

  public resetMovementsDetail(): void {
    this.store.dispatch(resetMovementsDetailAction());
  }

  public resetMovementsHistory(): void {
    this.store.dispatch(resetMovementsHistoryAction());
  }
}
