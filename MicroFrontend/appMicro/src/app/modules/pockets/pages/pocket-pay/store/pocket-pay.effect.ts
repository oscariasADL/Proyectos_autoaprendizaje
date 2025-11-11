import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PocketTypeEnum } from '@app/modules/pockets/entities/pockets.interface';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { NavController } from '@ionic/angular';
import * as pocketDetail from '@modules/pockets/pages/pocket-detail/store/pocket-detail.actions';
import {
  mapPocketPayError,
  mapPocketPayResponse
} from '@modules/pockets/pages/pocket-pay/mappers/pocket-pay-response.mapper';
import * as actions from '@modules/pockets/pages/pocket-pay/store/pocket-pay.actions';
import * as pocketsActions from '@modules/pockets/pages/pockets-home/store/pockets-home.actions';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import * as productActions from '@modules/product/store/product.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import {
  mapPocketDetailPayload,
  mapPocketWithReturnsDetailPayload
} from '@modules/pockets/helpers/pocket.helpers';
import { fetchPocketWithReturnsDetailAction } from '@modules/pockets/pages/pocket-detail-with-returns/store/pocket-detail-with-returns.actions';

@Injectable()
export class PocketPayEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: PocketsService
  ) {}

  pocketPayEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.pocketPayAction),
      switchMap((action) =>
        this.service.transferPocket(action.payload).pipe(
          mergeMap((response: SuccessResponse) => {
            const fetchDetailAction =
              action.pocket.pocketType === PocketTypeEnum.TraditionalPocket
                ? [
                    pocketDetail.fetchPocketDetailAction({
                      payload: mapPocketDetailPayload(action.pocket)
                    })
                  ]
                : [
                    fetchPocketWithReturnsDetailAction({
                      payload: mapPocketWithReturnsDetailPayload(action.pocket)
                    })
                  ];
            return [
              productActions.fetchProductsAction(),
              pocketsActions.fetchPocketsAction(),
              ...fetchDetailAction,
              actions.pocketPaySuccessAction({
                props: mapPocketPayResponse(response)
              })
            ];
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.pocketPayErrorAction({
                props: mapPocketPayError(error)
              })
            )
          ),
          tap(() => this.navCtrl.pop())
        )
      )
    )
  );
}
