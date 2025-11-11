import { Injectable } from '@angular/core';
import { Movement } from '@commons/entities/product/movement.interface';
import {
  MovementsDetailPayload,
  MovementsDetailPayloadParams
} from '@modules/movement/entities/movements-detail-payload.entity';
import { MovementsHistoryState } from '@modules/movement/store/movement.state';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppFacadeMock } from './app.facade.mock';

@Injectable()
export class MovementFacadeMock extends AppFacadeMock {
  public working$: Observable<boolean> = new BehaviorSubject(false);

  public movements$: Observable<Movement[]> = new BehaviorSubject([]);

  public movementsHistory$: Observable<MovementsHistoryState> =
    new BehaviorSubject({
      payload: {
        id: '123',
        params: {
          page: 1,
          pageSize: 1
        }
      },
      response: {
        results: [],
        totalResults: 0
      },
      working: false,
      completed: true,
      workingMore: false
    });

  public movementsHistoryResults$: Observable<Movement[]> = new BehaviorSubject(
    []
  );

  public movementsHistoryWorking$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public movementsHistoryCompleted$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public movementsHistoryPayload$: Observable<MovementsDetailPayload> =
    new BehaviorSubject(null);

  public fetchMovementsDetail(payload: MovementsDetailPayload): void {}

  public fetchMoreMovementsDetail(): void {}

  public fetchMovementsWithFilters(
    params: MovementsDetailPayloadParams
  ): void {}

  public resetMovementsDetail(): void {}

  public resetMovementsHistory(): void {}
}
