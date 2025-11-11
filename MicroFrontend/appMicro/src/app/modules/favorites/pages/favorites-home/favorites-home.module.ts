import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';

import { CommonModule } from '@angular/common';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { FavoritesHomePage } from '@modules/favorites/pages/favorites-home/favorites-home.page';
import { FavoritesHomePageRoutingModule } from '@modules/favorites/pages/favorites-home/favorites-home-routing.module';
import { FavoritesHomeEffect } from '@modules/favorites/pages/favorites-home/store/favorites-home.effect';
import { FavoritesModule } from '@modules/favorites/favorites.module';

@NgModule({
  declarations: [FavoritesHomePage],
  imports: [
    CommonModule,
    IonicModule,
    FavoritesHomePageRoutingModule,
    HeadersModule,
    GlobalPipesModule,
    EffectsModule.forFeature([FavoritesHomeEffect]),
    FavoritesModule
  ]
})
export class FavoritesHomePageModule {}
