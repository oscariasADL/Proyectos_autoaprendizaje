import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { NavController } from '@ionic/angular';
import * as pocketDetail from '@modules/pockets/pages/pocket-detail/store/pocket-detail.actions';
import {
  mapPocketStatusError,
  mapPocketStatusResponse
} from '@modules/pockets/pages/pocket-status/mappers/pocket-status-response.mapper';
import * as actions from '@modules/pockets/pages/pocket-status/store/pocket-status.actions';
import * as pocketsActions from '@modules/pockets/pages/pockets-home/store/pockets-home.actions';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import * as productActions from '@modules/product/store/product.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class PocketStatusEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: PocketsService
  ) {}

  pocketStatusEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updatePocketStatusAction),
      switchMap((action) =>
        this.service.updatePocket(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            pocketsActions.fetchPocketsAction(),
            pocketDetail.fetchPocketDetailAction({
              payload: action.detail
            }),
            actions.updatePocketStatusSuccessAction({
              props: mapPocketStatusResponse(action.payload)
            })
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.updatePocketStatusErrorAction({
                props: mapPocketStatusError(error, action.payload)
              })
            )
          )
        )
      )
    )
  );
}
