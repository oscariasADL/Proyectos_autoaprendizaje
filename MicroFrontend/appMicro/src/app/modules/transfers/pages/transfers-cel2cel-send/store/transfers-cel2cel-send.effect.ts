import { Injectable } from '@angular/core';

import { TransfersCel2celSendService } from '../services/transfers-cel2cel-send.service';
import * as actions from './transfers-cel2cel-send.actions';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class TransfersCel2celEffect {
  constructor(
    private actions$: Actions,
    private service: TransfersCel2celSendService
  ) {}

  fetchTowardProductsByPhoneNumber$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchTowardProductsByPhoneNumberAction),
      switchMap((action) =>
        this.service.fetchTowardProductsByPhoneNumber(action.phone).pipe(
          map((data) =>
            actions.fetchTowardProductsByPhoneNumberSuccessAction({
              towardProducts: data
            })
          ),
          catchError((message) =>
            of(actions.fetchTowardProductsByPhoneNumberErrorAction({ message }))
          )
        )
      )
    )
  );
}
