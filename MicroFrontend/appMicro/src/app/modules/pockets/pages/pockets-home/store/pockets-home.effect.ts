import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PocketsComplete } from '@modules/pockets/entities/pockets.interface';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as actions from './pockets-home.actions';

@Injectable()
export class PocketsHomeEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private service: PocketsService
  ) {}

  fetchPocketsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchPocketsAction),
      switchMap((action) =>
        this.service.fetchPockets().pipe(
          map((pockets: PocketsComplete) =>
            actions.fetchPocketsSuccessAction({ pockets })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchPocketsErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );
}
