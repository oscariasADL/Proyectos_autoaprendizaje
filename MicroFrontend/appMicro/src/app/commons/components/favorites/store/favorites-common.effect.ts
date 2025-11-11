import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';

import { FavoritesService } from '@modules/favorites/services/favorites.service';
import * as actions from './favorites-common.action';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { ModalController } from '@commons/controllers/modal.controller';
import { fetchFavoritesAction } from '@modules/favorites/store/favorites.actions';
import { mapFavoriteError } from '@modules/favorites/mappers/favorites-response.mapper';
import { SubtypeOperations } from '@modules/favorites/entities/favorites.interface';
import { FAVORITES } from '@commons/constants/navigate.constants';

@Injectable()
export class FavoritesCommonEffect {
  constructor(
    private actions$: Actions,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private service: FavoritesService,
    private favoritesFacade: FavoritesFacade
  ) {}

  createFavoriteEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.favoriteCreateAction),
      switchMap(({ payload }) =>
        this.service.createFavorite(payload).pipe(
          mergeMap(() => [
            actions.favoriteCreateSuccessAction({
              subType:
                payload?.favoriteTransaction?.additionalDataTransaction
                  ?.subtypeOperation
            }),
            fetchFavoritesAction()
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.favoriteCreateErrorAction({
                props: mapFavoriteError(error)
              })
            )
          )
        )
      )
    )
  );

  createFavoriteSuccessEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.favoriteCreateSuccessAction),
        tap(async ({ subType }) => {
          this.favoritesFacade.closeModal();
          try {
            await this.modalCtrl.dismiss();
          } catch (e) {}
          this.favoritesFacade.showToast({
            type: ToastType.success,
            title:
              subType === SubtypeOperations.RECHARGES
                ? 'FAVORITES.CREATE.SUCCESS_TITLE_RECHARGE'
                : subType === SubtypeOperations.MONEY_ORDER
                ? 'FAVORITES.CREATE.SUCCESS_TITLE_MONEY_ORDER'
                : 'FAVORITES.CREATE.SUCCESS_TITLE'
          });
          await this.navCtrl.navigateForward(FAVORITES);
        })
      ),
    { dispatch: false }
  );
}
