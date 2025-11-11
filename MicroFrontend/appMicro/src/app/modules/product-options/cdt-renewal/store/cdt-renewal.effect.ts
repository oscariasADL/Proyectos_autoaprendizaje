import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  GenericResponse,
  SuccessResponse
} from '@commons/entities/response/response.interface';
import { NavController } from '@ionic/angular';
import { CdtRenewalResponse } from '@modules/product-options/cdt-renewal/entities/cdt-renewal.entity';
import {
  mapCancelRenewalCdtError,
  mapCancelRenewalCdtResponse
} from '@modules/product-options/cdt-renewal/mappers/cdt-cancel-renewal-response.mapper';
import {
  mapRenewalCdtError,
  mapRenewalCdtResponse
} from '@modules/product-options/cdt-renewal/mappers/cdt-renewal-response.mapper';
import { CdtRenewalService } from '@modules/product-options/cdt-renewal/services/cdt-renewal.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as featureActions from './cdt-renewal.actions';

@Injectable()
export class CdtRenewalEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private navCtrl: NavController,
    private service: CdtRenewalService
  ) {}

  fetchCdtRenewalDetailEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.fetchCdtRenewalDetailAction),
      switchMap((action) =>
        this.service.fetchAccountDetails(action.id).pipe(
          map((detail: CdtRenewalResponse) =>
            featureActions.fetchCdtRenewalDetailSuccessAction({ detail })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              featureActions.fetchCdtRenewalDetailErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  renewalCdtEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.renewalCdtAction),
      switchMap((action) =>
        this.service.renewalCDT(action.payload).pipe(
          map((response: SuccessResponse) =>
            featureActions.renewalCdtSuccessAction({
              props: mapRenewalCdtResponse(response, action.cdt)
            })
          ),
          tap(() => this.navCtrl.pop()),
          catchError((error: HttpErrorResponse) =>
            of(
              featureActions.renewalCdtErrorAction({
                props: mapRenewalCdtError(error)
              })
            )
          )
        )
      )
    )
  );

  cancelRenewalCdtEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.cancelRenewalCdtAction),
      switchMap((action) =>
        this.service.cancelCDT(action.payload).pipe(
          map((response: SuccessResponse) =>
            featureActions.cancelRenewalCdtSuccessAction({
              props: mapCancelRenewalCdtResponse(response)
            })
          ),
          tap(() => this.navCtrl.pop()),
          catchError((error: HttpErrorResponse) =>
            of(
              featureActions.cancelRenewalCdtErrorAction({
                props: mapCancelRenewalCdtError(error)
              })
            )
          )
        )
      )
    )
  );
}
