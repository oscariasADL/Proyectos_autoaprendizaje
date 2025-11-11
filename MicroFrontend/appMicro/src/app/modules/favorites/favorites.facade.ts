import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppFacade } from '@app/app.facade';
import {
  Favorite,
  FavoriteDeletePayload,
  FavoritePayload,
  ProductByPhoneNumber
} from '@modules/favorites/entities/favorites.interface';
import {
  favoritesHomeSelector,
  favoritesWorkingSelector,
  favoritesCompletedSelector,
  oneFavoriteSelector,
  cellToCellTransferProducts,
  transfersCel2celTowardBankIdsSelector
} from '@modules/favorites/store/favorites.selector';
import {
  fetchFavoritesAction,
  fetchTowardProductsByPhoneNumberAction
} from '@modules/favorites/store/favorites.actions';
import { favoriteCreateAction } from '@commons/components/favorites/store/favorites-common.action';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { openModalAction } from '@store/actions/modal.action';
import { Product } from '@commons/entities/product/product.interface';
import {
  balanceWorkingSelector,
  hasProductsSelector,
  productsSelector
} from '@modules/product/store/product.selector';
import { TypeAccount } from '@commons/entities/product/type-account';
import {
  favoriteEditAction,
  favoriteEditBackgroundAction
} from '@modules/favorites/pages/favorites-edit/store/favorites-edit.actions';
import {
  deleteFavoriteAction,
  showConfirmDeleteAction
} from '@modules/favorites/pages/favorites-home/store/favorites-home.actions';

@Injectable()
export class FavoritesFacade extends AppFacade {
  public favorites$: Observable<Favorite[]> = this.store.pipe(
    select(favoritesHomeSelector)
  );

  public working$: Observable<boolean> = this.store.pipe(
    select(favoritesWorkingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(favoritesCompletedSelector)
  );

  // ToDo: Remove when there is getOneFavorite micro
  public balanceWorking$: Observable<boolean> = this.store.pipe(
    select(balanceWorkingSelector)
  );

  public hasProducts$: Observable<boolean> = this.store.pipe(
    select(hasProductsSelector(), {
      typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
    })
  );

  public products$: Observable<Product[]> = this.store.pipe(
    select(productsSelector(), {
      typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
    })
  );

  public fetchFavorites(): void {
    this.store.dispatch(fetchFavoritesAction());
  }

  public getFavorite(keyFavorite: string): Observable<Favorite> {
    return this.store.pipe(select(oneFavoriteSelector(keyFavorite)));
  }

  public createFavorite(payload: FavoritePayload): void {
    this.store.dispatch(favoriteCreateAction({ payload }));
  }

  public showDeleteConfirm(payload: FavoriteDeletePayload): void {
    this.store.dispatch(showConfirmDeleteAction({ payload }));
  }

  public deleteFavorite(payload: FavoriteDeletePayload): void {
    this.store.dispatch(deleteFavoriteAction({ payload }));
  }

  public showOptionDelete(properties: AlertSheetProperties): void {
    this.store.dispatch(openModalAction({ props: properties }));
  }

  public editFavorite(payload: FavoritePayload): void {
    this.store.dispatch(favoriteEditAction({ payload }));
  }

  public editFavoriteBackground(payload: FavoritePayload): void {
    this.store.dispatch(favoriteEditBackgroundAction({ payload }));
  }

  public cellToCellTransferProducts$: Observable<ProductByPhoneNumber[]> =
    this.store.pipe(select(cellToCellTransferProducts));

  public transfersCel2celBankIds$: Observable<any[]> = this.store.pipe(
    select(transfersCel2celTowardBankIdsSelector)
  );

  public fetchTowardProductsByPhoneNumber(phone: string) {
    this.store.dispatch(fetchTowardProductsByPhoneNumberAction({ phone }));
  }
}
