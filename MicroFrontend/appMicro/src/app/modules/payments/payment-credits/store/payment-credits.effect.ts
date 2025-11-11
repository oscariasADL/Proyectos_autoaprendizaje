import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { NavController } from '@ionic/angular';
import { PaymentCredits } from '@modules/payments/payment-credits/entities/payment-credits.interface';
import {
  mapPayLoanError,
  mapPayLoanResponse
} from '@modules/payments/payment-credits/mappers/pay-loan-response.mapper';
import { PaymentCreditsService } from '@modules/payments/payment-credits/services/payment-credits.service';
import * as actions from '@modules/payments/payment-credits/store/payment-credits.actions';
import * as productActions from '@modules/product/store/product.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class PaymentCreditsEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: PaymentCreditsService
  ) {}

  fetchPaymentsFilteredEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchPaymentsFilteredAction),
      switchMap((action) =>
        this.service.fetchPaymentCredits(action.filter).pipe(
          map((data: PaymentCredits) =>
            actions.fetchPaymentsFilteredSuccessAction({ data })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchPaymentsFilteredErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  payLoan$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.payLoanAction),
      switchMap((action) =>
        this.service.pay(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            productActions.fetchProductsAction(),
            actions.payLoanSuccessAction({
              props: mapPayLoanResponse(response, action.data.voucher)
            })
          ]),
          tap(() => this.navCtrl.pop()),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.payLoanErrorAction({
                props: mapPayLoanError(error)
              })
            )
          )
        )
      )
    )
  );
}
