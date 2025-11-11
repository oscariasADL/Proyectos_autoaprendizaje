import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PocketMovementsPage } from './pocket-movements.page';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import {
  pocketMovementsFeatureName,
  PocketMovementsState
} from '@modules/pockets/pages/pocket-movements/store/pocket-movements.state';
import { pocketMovementsReducer } from '@modules/pockets/pages/pocket-movements/store/pocket-movements.reducer';
import { PocketMovementsEffect } from '@modules/pockets/pages/pocket-movements/store/pocket-movements.effect';
import { PocketsModule } from '@modules/pockets/pockets.module';
import { PocketMovementsFacade } from '@modules/pockets/pages/pocket-movements/pocket-movements.facade';
import { MovementsDetailPageModule } from '@modules/product-options/movements-detail/movements-detail.module';
import { CommonsModule } from '@app/commons/commons.module';
import { PocketWithoutMovementsComponent } from '@modules/pockets/pages/pocket-movements/components/pocket-without-movements/pocket-without-movements.component';
import { TagComponent } from '@modules/pockets/pages/pocket-movements/components/tag/tag.component';

export const POCKET_MOVEMENTS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<PocketMovementsState>
>('Pocket Movements Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlobalPipesModule,
    HeadersModule,
    StoreModule.forFeature(
      pocketMovementsFeatureName,
      POCKET_MOVEMENTS_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([PocketMovementsEffect]),
    PocketsModule,
    MovementsDetailPageModule,
    CommonsModule,
    TagComponent
  ],
  declarations: [PocketMovementsPage, PocketWithoutMovementsComponent],
  exports: [PocketMovementsPage],
  providers: [
    PocketMovementsFacade,
    {
      provide: POCKET_MOVEMENTS_REDUCER_TOKEN,
      useValue: pocketMovementsReducer
    }
  ]
})
export class PocketMovementsPageModule {}
