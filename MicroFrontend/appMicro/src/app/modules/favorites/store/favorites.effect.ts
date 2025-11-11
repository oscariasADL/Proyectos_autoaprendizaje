import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavoritesService } from '@modules/favorites/services/favorites.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as actions from './favorites.actions';
import { Favorite } from '@modules/favorites/entities/favorites.interface';
import { TransfersCel2celSendService } from '@app/modules/transfers/pages/transfers-cel2cel-send/services/transfers-cel2cel-send.service';

@Injectable()
export class FavoritesHomeEffect {
  constructor(
    private actions$: Actions,
    private service: FavoritesService,
    private transfersCel2celSendService: TransfersCel2celSendService
  ) {}

  fetchFavoritesEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchFavoritesAction),
      switchMap((action) =>
        this.service.fetchFavorites().pipe(
          map((favorites: Favorite[]) =>
            actions.fetchFavoritesSuccessAction({ favorites })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchFavoritesErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  fetchTowardProductsByPhoneNumber$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchTowardProductsByPhoneNumberAction),
      switchMap((action) =>
        this.transfersCel2celSendService
          .fetchTowardProductsByPhoneNumber(action.phone)
          .pipe(
            map((data) =>
              actions.fetchTowardProductsByPhoneNumberSuccessAction({
                towardProducts: data
              })
            ),
            catchError((message) =>
              of(
                actions.fetchTowardProductsByPhoneNumberErrorAction({ message })
              )
            )
          )
      )
    )
  );
}
