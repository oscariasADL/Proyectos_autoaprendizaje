import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Pocket,
  PocketWithReturns
} from '@modules/pockets/entities/pockets.interface';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as actions from './pocket-detail-with-returns.actions';
import { SuccessResponse } from '@app/commons/entities/response/response.interface';
import {
  mapPocketStatusError,
  mapPocketStatusResponse
} from '../../pocket-status/mappers/pocket-status-response.mapper';
import {
  mapPocketDeleteError,
  mapPocketDeleteResponse
} from '../../pocket-delete/mappers/pocket-delete-response.mapper';
import { NavController } from '@ionic/angular';
import * as productActions from '@modules/product/store/product.actions';
import * as pocketsActions from '@modules/pockets/pages/pockets-home/store/pockets-home.actions';
import {
  getMappedError,
  getMappedResponse
} from '../mappers/pocket-wit-returns.mapper';

@Injectable()
export class PocketDetailWithReturnsEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private service: PocketsService,
    private navController: NavController
  ) {}

  fetchPocketWithReturnsDetailEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchPocketWithReturnsDetailAction),
      switchMap((action) =>
        this.service.fetchPocketDetailWithReturns(action.payload).pipe(
          map((pocket: PocketWithReturns) =>
            actions.fetchPocketDetailWithReturnsSuccessAction({ pocket })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchPocketDetailWithReturnsErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  updatePocketWithReturnsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updatePocketWithReturnsStatusAction),
      switchMap((action) =>
        this.service.updatePocketWithReturns(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            productActions.fetchProductsAction(),
            pocketsActions.fetchPocketsAction(),
            actions.fetchPocketWithReturnsDetailAction({
              payload: {
                parentId: action.payload.productIdParent,
                parentIdType: action.payload.productTypeParent,
                pocketId: action.payload.id,
                pocketType: action.payload.type
              }
            }),
            actions.updatePocketWithReturnsStatusSuccessAction({
              props: getMappedResponse(
                action.pocketModificationType,
                action.payload
              )
            })
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.updatePocketWithReturnsStatusErrorAction({
                props: getMappedError(
                  action.pocketModificationType,
                  action.payload,
                  error
                )
              })
            )
          )
        )
      )
    )
  );

  fetchPocketMovementsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchPocketWithReturnsMovementsAction),
      switchMap(({ payload }) =>
        this.service.movementsPocket(payload).pipe(
          map((movements) =>
            actions.fetchPocketWithReturnsMovementsSuccessAction({ movements })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchPocketWithReturnsMovementsErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  pocketDeleteEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.pocketWithReturnsDeleteAction),
      tap((_) => this.navController.pop()),
      switchMap((action) =>
        this.service.deletePocket(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            productActions.fetchProductsAction(),
            pocketsActions.fetchPocketsAction(),
            actions.pocketWithReturnsDeleteSuccessAction({
              props: mapPocketDeleteResponse(response)
            })
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.pocketWithReturnsDeleteErrorAction({
                props: mapPocketDeleteError(error)
              })
            )
          )
        )
      )
    )
  );
}
