import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { NavController } from '@ionic/angular';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import {
  mapDirectedPaymentError,
  mapDirectedPaymentFailedResponse,
  mapDirectedPaymentSuccessResponse
} from '@modules/product-options/credit-movements/pages/directed-payment/mappers/directed-payment-response.mapper';
import {
  mapUpdateInstallmentsError,
  mapUpdateInstallmentsResponse
} from '@modules/product-options/credit-movements/pages/update-installments/mappers/update-installments-response.mapper';
import { CreditMovementsService } from '@modules/product-options/credit-movements/services/credit-movements.service';
import * as actions from '@modules/product-options/credit-movements/store/credit-movements.action';
import * as productActions from '@modules/product/store/product.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { DirectedPaymentResponse } from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';
import { UPDATE_INSTALLMENTS } from '@commons/constants/navigate.constants';

@Injectable()
export class CreditMovementsEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: CreditMovementsService,
    private translate: TranslateService
  ) {}

  fetchCreditMovementsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchCreditMovementsAction),
      switchMap((action) =>
        this.service.fetchPayments(action.productId).pipe(
          map((movements: CreditMovement[]) =>
            actions.fetchCreditMovementsSuccessAction({ movements })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchCreditMovementsErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  directedPaymentEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.directedPaymentAction),
      switchMap((action) =>
        this.service.directPayment(action.payload).pipe(
          mergeMap((response: DirectedPaymentResponse[]) => {
            const directedPaymentFailed = response.filter(
              (directedPayment) => !directedPayment.directedPaymentStatus
            );

            if (directedPaymentFailed.length === response.length) {
              return [
                actions.directedPaymentSuccessAction({
                  props: mapDirectedPaymentFailedResponse(response)
                })
              ];
            }

            return [
              productActions.fetchProductsAction(),
              actions.directedPaymentSuccessAction({
                props: mapDirectedPaymentSuccessResponse(
                  response,
                  action.data.voucher
                )
              })
            ];
          }),
          tap(() => this.navCtrl.pop()),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.directedPaymentErrorAction({
                props: mapDirectedPaymentError(error)
              })
            )
          )
        )
      )
    )
  );

  updateInstallmentsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateInstallmentsAction),
      switchMap((action) =>
        this.service.updateInstallment(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            actions.updateInstallmentsSuccessAction({
              props: mapUpdateInstallmentsResponse()
            })
          ]),
          //tap(() => this.navCtrl.pop()),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.updateInstallmentsErrorAction({
                props: mapUpdateInstallmentsError(error)
              })
            )
          )
        )
      )
    )
  );
}
