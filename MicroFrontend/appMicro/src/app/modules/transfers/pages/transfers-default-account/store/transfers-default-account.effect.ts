import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import * as actions from '@modules/transfers/pages/transfers-default-account/store/transfers-default-account.actions';
import { TransfersAccountDefaultService } from '@modules/transfers/pages/transfers-default-account/services/transfers-account-default.service';
import { ToastType } from '@commons/entities/toast/toast.entities';

@Injectable()
export class TransfersDefaultAccountEffect {
  constructor(
    private actions$: Actions,
    private service: TransfersAccountDefaultService
  ) {}

  fetchDefaultAccountEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchDefaultAccountAction),
      switchMap(() =>
        this.service.fetchDefaultAccount().pipe(
          map((defaultAccount) =>
            actions.fetchDefaultAccountSuccessAction({ defaultAccount })
          ),
          catchError((error: HttpErrorResponse) =>
            of(actions.fetchDefaultAccountErrorAction())
          )
        )
      )
    )
  );

  deleteDefaultAccountEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteDefaultAccountAction),
      switchMap(() =>
        this.service.deleteDefaultAccount().pipe(
          mergeMap(() => [
            actions.deleteDefaultAccountSuccessAction({
              props: {
                type: ToastType.success,
                title:
                  'TRANSFERS.TRANSFIYA.MANAGEMENT.ACCOUNT_DEFAULT.REMOVE_ACCOUNT.REMOVE_SUCCESS'
              }
            }),
            actions.fetchDefaultAccountAction()
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.deleteDefaultAccountErrorAction({
                props: {
                  type: ToastType.error,
                  title:
                    'TRANSFERS.TRANSFIYA.MANAGEMENT.ACCOUNT_DEFAULT.REMOVE_ACCOUNT.REMOVE_ERROR'
                }
              })
            )
          )
        )
      )
    )
  );
}
