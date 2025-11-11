import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as actions from './transfers-aval-key.actions';
import { TransfersAvalKeyService } from '@modules/transfers/pages/transfers-aval-key/services/transfers-aval-key.service';
import { HttpErrorResponse } from '@angular/common/http';
import { mapFetchAccountAvalKeyError } from '@modules/transfers/pages/transfers-aval-key/mappers/transfers-aval-key.mapper';

@Injectable()
export class TransfersAvalKeyEffect {
  constructor(
    private actions$: Actions,
    private service: TransfersAvalKeyService
  ) {}

  fetchAccountAvalKeyEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchAccountAvalKeyAction),
      switchMap((action) =>
        this.service.fetchAccountAvalKey(action.avalKey).pipe(
          map((accountAvalKey) =>
            actions.fetchAccountAvalKeySuccessAction({ accountAvalKey })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchAccountAvalKeyErrorAction({
                props: mapFetchAccountAvalKeyError(error)
              })
            )
          )
        )
      )
    )
  );
}
