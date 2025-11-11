import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { NavController } from '@ionic/angular';
import * as productActions from '@modules/product/store/product.actions';
import { CashOutType } from '@modules/withdraw/entities/withdraw.interface';
import {
  mapCashWithdrawalsError,
  mapCashWithdrawalsResponse
} from '@modules/withdraw/pages/cash-withdrawals/mappers/cash-withdrawals-response.mapper';
import {
  mapMoneyOrdersError,
  mapMoneyOrdersResponse
} from '@modules/withdraw/pages/money-orders/mappers/money-orders-response.mapper';
import { WithdrawService } from '@modules/withdraw/service/withdraw.service';
import * as actions from '@modules/withdraw/store/withdraw.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class WithdrawEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private navCtrl: NavController,
    private service: WithdrawService
  ) {}

  WithdrawEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.withdrawAction),
      switchMap((action) =>
        this.service.withdraw(action.payload).pipe(
          mergeMap((response: GenericResponse) => [
            productActions.fetchProductsAction(),
            actions.withdrawSuccessAction({
              props:
                action.payload.cashoutType === CashOutType.MONEY_ORDER
                  ? mapMoneyOrdersResponse(
                      action.payload,
                      response,
                      action.data.voucher
                    )
                  : mapCashWithdrawalsResponse(response, action.data.voucher)
            })
          ]),
          tap(() => this.navCtrl.navigateRoot(action.data.backUrl)),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.withdrawErrorAction({
                props:
                  action.payload.cashoutType === CashOutType.MONEY_ORDER
                    ? mapMoneyOrdersError(error)
                    : mapCashWithdrawalsError(error)
              })
            )
          )
        )
      )
    )
  );
}
