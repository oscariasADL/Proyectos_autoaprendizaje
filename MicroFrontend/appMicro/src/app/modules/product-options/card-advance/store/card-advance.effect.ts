import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { NavController } from '@ionic/angular';
import {
  mapCardAdvanceError,
  mapCardAdvanceResponse
} from '@modules/product-options/card-advance/mappers/card-advance-response.mapper';
import { CardAdvanceService } from '@modules/product-options/card-advance/service/card-advance.service';
import * as actions from '@modules/product-options/card-advance/store/card-advance.actions';
import * as productActions from '@modules/product/store/product.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class CardAdvanceEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: CardAdvanceService
  ) {}

  cardAdvanceEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.cardAdvanceAction),
      switchMap((action) =>
        this.service.cardAdvance(action.payload).pipe(
          mergeMap((response: SuccessResponse) => [
            productActions.fetchProductsAction(),
            actions.cardAdvanceSuccessAction({
              props: mapCardAdvanceResponse(response, action.data.voucher)
            })
          ]),
          tap(() => this.navCtrl.navigateRoot(action.data.backUrl)),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.cardAdvanceErrorAction({
                props: mapCardAdvanceError(error)
              })
            )
          )
        )
      )
    )
  );
}
