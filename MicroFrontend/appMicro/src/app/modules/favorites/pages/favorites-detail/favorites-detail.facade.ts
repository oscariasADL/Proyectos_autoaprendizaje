import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppFacade } from '@app/app.facade';
import { Favorite } from '@modules/favorites/entities/favorites.interface';
import {
  favoriteDetailCompletedSelector,
  favoriteDetailSelector,
  favoriteDetailWorkingSelector
} from '@modules/favorites/pages/favorites-detail/store/favorites-detail.selector';
import {
  fetchFavoriteDetailAction,
  setFavoriteDetailAction
} from '@modules/favorites/pages/favorites-detail/store/favorites-detail.actions';

@Injectable()
export class FavoritesDetailFacade extends AppFacade {
  public favorite$: Observable<Favorite> = this.store.pipe(
    select(favoriteDetailSelector)
  );

  public working$: Observable<boolean> = this.store.pipe(
    select(favoriteDetailWorkingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(favoriteDetailCompletedSelector)
  );

  public fetchFavorite(keyFavorite: string): void {
    this.store.dispatch(fetchFavoriteDetailAction({ keyFavorite }));
  }

  public setFavoriteDetail(favorite: Favorite): void {
    this.store.dispatch(setFavoriteDetailAction({ favorite }));
  }
}
