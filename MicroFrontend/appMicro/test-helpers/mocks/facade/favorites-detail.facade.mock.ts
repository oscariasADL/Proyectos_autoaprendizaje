import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

@Injectable()
export class FavoritesDetailFacadeMock extends AppFacadeMock {
  public favorite$: Observable<Favorite> = new BehaviorSubject(null);

  public working$: Observable<boolean> = of(false);

  public completed$: Observable<boolean> = of(true);

  public fetchFavorite(keyFavorite: string): void {}

  public setFavoriteDetail(favorite: Favorite): void {}
}
