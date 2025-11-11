import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as actions from './/block-account.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { BlockAccountService } from '@modules/product-options/block-account/services/block-account.service';
import { fetchProductsAction } from '@modules/product/store/product.actions';

@Injectable()
export class BlockAccountEffect {
  constructor(
    private actions$: Actions,
    private service: BlockAccountService
  ) {}

  fetchBlockAccountProductMediasEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchBlockAccountProductMediasAction),
      switchMap(() =>
        this.service.fetchProductMedias().pipe(
          map((data) =>
            actions.fetchBlockAccountProductMediasSuccessAction({
              medias: data
            })
          ),
          catchError((message) =>
            of(actions.fetchBlockAccountProductMediasErrorAction({ message }))
          )
        )
      )
    )
  );

  sendBlockAccountEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.sendBlockAccountAction),
      switchMap((action) =>
        this.service
          .sendBlockAccount({
            lockId: action.payload.lockId,
            relativeId: action.payload.relativeId
          })
          .pipe(
            mergeMap((data) => [
              actions.sendBlockAccountSuccessAction({ props: data }),
              fetchProductsAction()
            ]),
            catchError((message) =>
              of(
                actions.sendBlockAccountErrorAction({
                  props: message
                })
              )
            )
          )
      )
    )
  );
}
