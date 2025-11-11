import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { NavController } from '@ionic/angular';
import * as productActions from '@modules/product/store/product.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { UseQuotaService } from '@modules/product-options/use-quota/service/use-quota.service';
import * as actions from '@modules/product-options/use-quota/store/use-quota.actions';
import {
  mapUseQuotaError,
  mapUseQuotaResponse
} from '@modules/product-options/use-quota/mappers/use-quota-response.mapper';

@Injectable()
export class UseQuotaEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: UseQuotaService
  ) {}

  useQuotaEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.useQuotaAction),
      switchMap((action) =>
        this.service.useQuota(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            productActions.fetchProductsAction(),
            actions.useQuotaSuccessAction({
              props: mapUseQuotaResponse(response, action.data.voucher)
            })
          ]),
          tap(() => this.navCtrl.navigateRoot(action.data.backUrl)),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.useQuotaErrorAction({
                props: mapUseQuotaError(error)
              })
            )
          )
        )
      )
    )
  );
}
