import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '@modules/favorites/services/favorites.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as actions from './favorites-home.actions';
import { toastAction } from '@store/actions/toast.action';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { ModalController } from '@commons/controllers/modal.controller';
import { fetchFavoritesAction } from '@modules/favorites/store/favorites.actions';
import { AlertService } from '@commons/services/alert.service';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { FAVORITES_DELETE_ALERT } from '@modules/favorites/pages/favorites-home/constants/favorites-home.constants';
import { mapFavoriteError } from '@modules/favorites/mappers/favorites-response.mapper';

@Injectable()
export class FavoritesHomeEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private service: FavoritesService,
    private favoritesFacade: FavoritesFacade,
    private modalCtrl: ModalController,
    private alertService: AlertService
  ) {}

  showConfirmDeleteEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.showConfirmDeleteAction),
        tap(async ({ payload }) => {
          this.alertService
            .create(FAVORITES_DELETE_ALERT)
            .then(async (confirm) => {
              if (confirm) {
                this.favoritesFacade.deleteFavorite(payload);
              } else {
                await this.modalCtrl.dismiss();
              }
            });
        })
      ),
    { dispatch: false }
  );

  deleteFavoritesEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteFavoriteAction),
      switchMap(({ payload }) =>
        this.service.deleteFavorite(payload).pipe(
          mergeMap((response) => [
            fetchFavoritesAction(),
            toastAction({
              props: { type: ToastType.success, title: response.description }
            }),
            actions.deleteFavoritesSuccessAction()
          ]),
          tap(async () => {
            try {
              await this.modalCtrl.dismiss();
              await this.modalCtrl.dismiss();
            } catch (e) {}
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.deleteFavoritesErrorAction({
                props: mapFavoriteError(error)
              })
            )
          )
        )
      )
    )
  );
}
