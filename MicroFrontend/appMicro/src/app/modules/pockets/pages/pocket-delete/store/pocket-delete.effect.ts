import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { POCKETS } from '@commons/constants/navigate.constants';
import { NavController } from '@ionic/angular';
import {
  mapPocketDeleteError,
  mapPocketDeleteResponse
} from '@modules/pockets/pages/pocket-delete/mappers/pocket-delete-response.mapper';
import * as actions from '@modules/pockets/pages/pocket-delete/store/pocket-delete.actions';
import * as pocketsActions from '@modules/pockets/pages/pockets-home/store/pockets-home.actions';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import * as productActions from '@modules/product/store/product.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class PocketDeleteEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: PocketsService
  ) {}

  pocketDeleteEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.pocketDeleteAction),
      tap((_) => this.navCtrl.pop()),
      switchMap((action) =>
        this.service.deletePocket(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            productActions.fetchProductsAction(),
            pocketsActions.fetchPocketsAction(),
            actions.pocketDeleteSuccessAction({
              props: mapPocketDeleteResponse(response)
            })
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.pocketDeleteErrorAction({
                props: mapPocketDeleteError(error)
              })
            )
          )
        )
      )
    )
  );
}
