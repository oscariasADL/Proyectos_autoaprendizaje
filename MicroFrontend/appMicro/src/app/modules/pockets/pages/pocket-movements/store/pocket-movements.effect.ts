import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as actions from './pocket-movements.actions';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PocketMovementsEffect {
  constructor(private actions$: Actions, private service: PocketsService) {}

  fetchPocketMovementsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchPocketMovementsAction),
      switchMap(({ payload }) =>
        this.service.movementsPocket(payload).pipe(
          map((movements) =>
            actions.fetchPocketMovementsSuccessAction({ movements })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchPocketMovementsErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );
}
