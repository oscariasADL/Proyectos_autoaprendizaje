import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as productActions from '@modules/product/store/product.actions';
import * as actions from '@modules/qr/pages/qr-pay/store/qr-pay.actions';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { HOME } from '@commons/constants/navigate.constants';
import {
  mapQrCancelError,
  mapQrCancelResponse,
  mapQrPayError,
  mapQrPayResponse
} from '@modules/qr/pages/qr-pay/mappers/qr-pay-response.mapper';
import { QrPayService } from '@modules/qr/pages/qr-pay/service/qr-pay.service';
import { TransfersService } from '@modules/transfers/service/transfers.service';

@Injectable()
export class QrPayEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: QrPayService,
    private transfersService: TransfersService
  ) {}

  payQREffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.payQRAction),
      switchMap((action) =>
        this.service.payQR(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            productActions.fetchProductsAction(),
            actions.payQRSuccessAction({
              props: mapQrPayResponse(response, action.data.voucher)
            })
          ]),
          tap(() => this.navCtrl.navigateRoot(HOME)),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.payQRErrorAction({
                props: mapQrPayError(error)
              })
            )
          )
        )
      )
    )
  );

  payQRAccountEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.payQRAccountAction),
      switchMap((action) =>
        this.service.payQrAccount(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            productActions.fetchProductsAction(),
            actions.payQRSuccessAction({
              props: mapQrPayResponse(response, action.data.voucher)
            })
          ]),
          tap(() => this.navCtrl.navigateRoot(HOME)),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.payQRErrorAction({
                props: mapQrPayError(error)
              })
            )
          )
        )
      )
    )
  );

  payQRSpiUserKeyEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.payQRSpiUserKeyAction),
      switchMap((action) =>
        this.transfersService.transfer(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            productActions.fetchProductsAction(),
            actions.payQRSuccessAction({
              props: mapQrPayResponse(response, action.data.voucher)
            })
          ]),
          tap(() => this.navCtrl.navigateRoot(HOME)),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.payQRErrorAction({
                props: mapQrPayError(error)
              })
            )
          )
        )
      )
    )
  );

  cancelQREffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.cancelQRAction),
      switchMap((action) =>
        this.service.cancelQR(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            productActions.fetchProductsAction(),
            actions.cancelQRSuccessAction({
              props: mapQrCancelResponse(response, action.data.voucher)
            })
          ]),
          tap(() => this.navCtrl.navigateRoot(HOME)),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.cancelQRErrorAction({
                props: mapQrCancelError(error)
              })
            )
          )
        )
      )
    )
  );
}
