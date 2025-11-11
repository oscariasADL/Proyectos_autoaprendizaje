import { InjectionToken, NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FavoritesDetailEffect } from '@modules/favorites/pages/favorites-detail/store/favorites-detail.effect';
import { FavoritesDetailFacade } from '@modules/favorites/pages/favorites-detail/favorites-detail.facade';
import {
  favoritesDetailFeatureName,
  FavoritesDetailState
} from '@modules/favorites/pages/favorites-detail/store/favorites-detaill.state';
import { favoritesDetailReducer } from '@modules/favorites/pages/favorites-detail/store/favorites-detail.reducer';
import { FavoritesService } from '@modules/favorites/services/favorites.service';

export const FAVORITES_DETAIL_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<FavoritesDetailState>
>('Favorites Detail Module state');

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(
      favoritesDetailFeatureName,
      FAVORITES_DETAIL_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([FavoritesDetailEffect])
  ],
  providers: [
    FavoritesDetailFacade,
    FavoritesService,
    {
      provide: FAVORITES_DETAIL_REDUCER_TOKEN,
      useValue: favoritesDetailReducer
    }
  ]
})
export class FavoritesDetailModule {}
