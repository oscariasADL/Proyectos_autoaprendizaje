import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { NavController } from '@ionic/angular';
import {
  mapRechargesError,
  mapRechargesResponse
} from '@modules/product-options/recharges/mappers/recharges-response.mapper';
import { RechargesService } from '@modules/product-options/recharges/service/recharges.service';
import * as actions from '@modules/product-options/recharges/store/recharges.actions';
import * as productActions from '@modules/product/store/product.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class RechargesEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: RechargesService
  ) {}

  rechargeEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.rechargeAction),
      switchMap((action) =>
        this.service.recharge(action.payload).pipe(
          mergeMap((response: GenericResponse) => [
            productActions.fetchProductsAction(),
            actions.rechargeSuccessAction({
              props: mapRechargesResponse(
                action.payload,
                response,
                action.data.voucher
              )
            })
          ]),
          tap(() => this.navCtrl.navigateRoot(action.data.backUrl)),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.rechargeErrorAction({
                props: mapRechargesError(error)
              })
            )
          )
        )
      )
    )
  );
}
