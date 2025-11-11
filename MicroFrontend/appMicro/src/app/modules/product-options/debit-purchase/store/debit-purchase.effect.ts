import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { NavController } from '@ionic/angular';
import * as actions from '@modules/product-options/debit-purchase/store/debit-purchase.actions';
import * as productActions from '@modules/product/store/product.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import {
  mapDebitPurchaseError,
  mapDebitPurchaseResponse
} from '../mappers/debit-purchase-response.mapper';
import { DebitPurchaseService } from '../service/debit-purchase.service';

@Injectable()
export class DebitPurchaseEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: DebitPurchaseService
  ) {}

  debitPurchaseEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.debitPurchaseAction),
      switchMap((action) =>
        this.service.debitPurchase(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            productActions.fetchProductsAction(),
            actions.debitPurchaseSuccessAction({
              props: mapDebitPurchaseResponse(response, action.data.voucher)
            })
          ]),
          tap(() => this.navCtrl.navigateRoot(action.data.backUrl)),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.debitPurchaseErrorAction({
                props: mapDebitPurchaseError(error)
              })
            )
          )
        )
      )
    )
  );
}
