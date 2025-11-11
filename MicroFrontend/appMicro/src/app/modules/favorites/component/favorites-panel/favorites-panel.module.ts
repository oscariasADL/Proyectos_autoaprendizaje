import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { FavoritesPanelComponent } from '@modules/favorites/component/favorites-panel/favorites-panel.component';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { FavoritesFacade } from '@modules/favorites/favorites.facade';
import { PreloadImageDirective } from '@app/commons/directives/preload-image/preload-image.directive';
import { AddFavoriteCardComponent } from '../add-favorite-card/add-favorite-card.component';

@NgModule({
  declarations: [FavoritesPanelComponent],
  imports: [
    CommonModule,
    PreloadImageDirective,
    IonicModule,
    RouterModule,
    GlobalPipesModule,
    AddFavoriteCardComponent
  ],
  providers: [FavoritesFacade],
  exports: [FavoritesPanelComponent]
})
export class FavoritesPanelModule {}
