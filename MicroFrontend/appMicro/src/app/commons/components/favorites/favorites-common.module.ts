import { NgModule } from '@angular/core';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { EffectsModule } from '@ngrx/effects';
import { FavoritesCommonEffect } from '@commons/components/favorites/store/favorites-common.effect';
import { FavoritesService } from '@modules/favorites/services/favorites.service';

@NgModule({
  imports: [EffectsModule.forFeature([FavoritesCommonEffect])],
  providers: [FavoritesFacade, FavoritesService]
})
export class FavoritesCommonModule {}
