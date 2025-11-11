import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pocket } from '@modules/pockets/entities/pockets.interface';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as actions from './pocket-detail.actions';

@Injectable()
export class PocketDetailEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private service: PocketsService
  ) {}

  fetchPocketsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchPocketDetailAction),
      switchMap((action) =>
        this.service.fetchPocketDetail(action.payload).pipe(
          map((pocket: Pocket) =>
            actions.fetchPocketDetailSuccessAction({ pocket })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchPocketDetailErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );
}
