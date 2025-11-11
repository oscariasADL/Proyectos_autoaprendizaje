import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as actions from './cancel-account.actions';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CancelAccountService } from '@modules/product-options/cancel-account/services/cancel-account.service';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import {
  mapCancelAccountError,
  mapCancelAccountResponse
} from '@modules/product-options/cancel-account/mappers/cancel-account.mapper';
import { NavController } from '@ionic/angular';
import { fetchProductsAction } from '@modules/product/store/product.actions';
import { fetchDigitalDebitCardsAction } from '@modules/digital-debit-card/store/digital-debit-card.actions';

@Injectable()
export class CancelAccountsEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: CancelAccountService
  ) {}

  public cancelAccountEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.cancelAccountAction),
      switchMap(({ cancelAccountPayload }) =>
        this.service.cancelAccount(cancelAccountPayload).pipe(
          mergeMap((response: GenericResponse) => [
            actions.cancelAccountSuccessAction({
              props: mapCancelAccountResponse(response, cancelAccountPayload)
            }),
            fetchProductsAction(),
            fetchDigitalDebitCardsAction()
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.cancelAccountErrorAction({
                props: mapCancelAccountError(error)
              })
            )
          )
        )
      )
    )
  );

  public cancelAccountSuccessEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.cancelAccountSuccessAction),
        tap(() => this.navCtrl.navigateForward('/'))
      ),
    { dispatch: false }
  );
}
