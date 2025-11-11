import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { FavoritesService } from '@modules/favorites/services/favorites.service';
import * as actions from './favorites-detail.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class FavoritesDetailEffect {
  constructor(private actions$: Actions, private service: FavoritesService) {}

  fetchFavoriteDetailEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchFavoriteDetailAction),
      switchMap(({ keyFavorite }) =>
        this.service.fetchFavoriteDetail(keyFavorite).pipe(
          map((favorite) =>
            actions.fetchFavoriteDetailSuccessAction({ favorite })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchFavoriteDetailErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );
}
