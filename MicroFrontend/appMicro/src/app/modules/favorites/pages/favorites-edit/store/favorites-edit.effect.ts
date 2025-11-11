import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

import * as actions from '@modules/favorites/pages/favorites-edit/store/favorites-edit.actions';
import { fetchFavoritesAction } from '@modules/favorites/store/favorites.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { mapFavoriteError } from '@modules/favorites/mappers/favorites-response.mapper';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { FavoritesService } from '@modules/favorites/services/favorites.service';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import { FAVORITES } from '@commons/constants/navigate.constants';

@Injectable()
export class FavoritesEditEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private service: FavoritesService,
    private facade: FavoritesFacade,
    private modalCtrl: ModalController
  ) {}

  editFavoriteEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.favoriteEditAction),
      switchMap(({ payload }) =>
        this.service.updateFavorite(payload).pipe(
          mergeMap(() => [
            actions.favoriteEditSuccessAction(),
            fetchFavoritesAction()
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.favoriteEditErrorAction({
                props: mapFavoriteError(error)
              })
            )
          )
        )
      )
    )
  );

  editFavoriteBackgroundEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.favoriteEditBackgroundAction),
      switchMap(({ payload }) =>
        this.service
          .updateFavorite(payload)
          .pipe(mergeMap(() => [fetchFavoritesAction()]))
      )
    )
  );

  editFavoriteSuccessEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.favoriteEditSuccessAction),
        tap(async () => {
          this.facade.showToast({
            type: ToastType.success,
            title: 'FAVORITES.EDIT.SUCCESS_TITLE'
          });
          await this.navCtrl.navigateForward(FAVORITES);
        })
      ),
    { dispatch: false }
  );
}
