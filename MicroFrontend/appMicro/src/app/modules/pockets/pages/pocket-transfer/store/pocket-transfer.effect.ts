import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  mergeMap,
  switchMap,
  take,
  tap
} from 'rxjs/operators';

import { SuccessResponse } from '@commons/entities/response/response.interface';
import { POCKETS } from '@commons/constants/navigate.constants';
import * as pocketDetail from '@modules/pockets/pages/pocket-detail/store/pocket-detail.actions';
import {
  mapPocketTransferError,
  mapPocketTransferResponse
} from '@modules/pockets/pages/pocket-transfer/mappers/pocket-transfer-response.mapper';
import * as actions from '@modules/pockets/pages/pocket-transfer/store/pocket-transfer.actions';
import * as pocketsActions from '@modules/pockets/pages/pockets-home/store/pockets-home.actions';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import * as productActions from '@modules/product/store/product.actions';
import { PocketTypeEnum } from '@modules/pockets/entities/pockets.interface';
import { fetchPocketWithReturnsDetailAction } from '@modules/pockets/pages/pocket-detail-with-returns/store/pocket-detail-with-returns.actions';

@Injectable()
export class PocketTransferEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private facade: PocketsFacade,
    private service: PocketsService
  ) {}

  pocketTransferEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.pocketTransferAction),
      switchMap((action) =>
        this.service.transferPocket(action.payload).pipe(
          mergeMap((response: SuccessResponse) => {
            const refreshActions = [
              productActions.fetchProductsAction(),
              pocketsActions.fetchPocketsAction()
            ];
            if (action.backUrl.toString() !== POCKETS.toString()) {
              const fetchPocketDetailAction =
                action.pocketType === PocketTypeEnum.PocketWithReturns
                  ? [
                      fetchPocketWithReturnsDetailAction({
                        payload: action.detail
                      })
                    ]
                  : [
                      pocketDetail.fetchPocketDetailAction({
                        payload: action.detail
                      })
                    ];
              refreshActions.push(...fetchPocketDetailAction);
            }

            this.facade.dispatch(refreshActions);

            return this.facade.completed$.pipe(
              filter((completed) => completed),
              take(1),
              mergeMap(() => [
                actions.pocketTransferSuccessAction({
                  props: mapPocketTransferResponse(response)
                })
              ])
            );
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.pocketTransferErrorAction({
                props: mapPocketTransferError(error)
              })
            )
          ),
          tap(() =>
            action.backUrl.toString() !== POCKETS.toString()
              ? this.navCtrl.pop()
              : this.navCtrl.navigateBack(action.backUrl)
          )
        )
      )
    )
  );
}
