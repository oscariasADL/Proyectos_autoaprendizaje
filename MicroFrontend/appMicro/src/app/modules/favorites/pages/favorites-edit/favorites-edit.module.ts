import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';

import { FavoritesEditPage } from '@modules/favorites/pages/favorites-edit/favorites-edit.page';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { FavoritesEditPageRoutingModule } from '@modules/favorites/pages/favorites-edit/favorites-edit.routing.module';
import { FavoritesDetailModule } from '@modules/favorites/pages/favorites-detail/favorites-detail.module';
import { FavoritesModule } from '@modules/favorites/favorites.module';
import { FavoritesEditEffect } from '@modules/favorites/pages/favorites-edit/store/favorites-edit.effect';

@NgModule({
  declarations: [FavoritesEditPage],
  imports: [
    CommonModule,
    IonicModule,
    HeadersModule,
    GlobalPipesModule,
    FavoritesEditPageRoutingModule,
    FavoritesDetailModule,
    FavoritesModule,
    EffectsModule.forFeature([FavoritesEditEffect])
  ]
})
export class FavoritesEditModule {}
