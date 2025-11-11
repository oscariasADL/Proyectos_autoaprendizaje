import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { NavController } from '@ionic/angular';
import * as pocketDetail from '@modules/pockets/pages/pocket-detail-with-returns/store/pocket-detail-with-returns.actions';
import {
  mapPocketEditError,
  mapPocketEditResponse
} from '@modules/pockets/pages/pocket-edit/mappers/pocket-edit-response.mapper';
import * as actions from '@modules/pockets/pages/edit-pocket-with-returns/store/edit-pocket-with-returns.actions';
import * as pocketsActions from '@modules/pockets/pages/pockets-home/store/pockets-home.actions';
import { PocketsService } from '@modules/pockets/services/pockets.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class PocketithReturnsEditEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: PocketsService
  ) {}

  pocketWithReturnsEditEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.pocketWithReturnsEditAction),
      switchMap((action) =>
        this.service.updatePocketWithReturns(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            pocketsActions.fetchPocketsAction(),
            pocketDetail.fetchPocketWithReturnsDetailAction({
              payload: action.detail
            }),
            actions.pocketWithReturnsEditSuccessAction({
              props: mapPocketEditResponse(response)
            })
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.pocketWithReturnsEditErrorAction({
                props: mapPocketEditError(error)
              })
            )
          ),
          tap(() => this.navCtrl.pop())
        )
      )
    )
  );
}
