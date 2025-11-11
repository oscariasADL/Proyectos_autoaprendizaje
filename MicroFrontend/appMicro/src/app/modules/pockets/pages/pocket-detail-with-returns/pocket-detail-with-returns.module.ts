import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { HeadersModule } from '@commons/components/headers/headers.module';

import { IonicModule } from '@ionic/angular';

import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { PocketDetailWithReturnsPage } from './pocket-detail-with-returns.page';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';

import { PocketDetailWithReturnsEffect } from './store/pocket-detail-with-returns.effect';
import { PocketDetailWithReturnsFacade } from './pocket-detail-with-returns.facade';
import {
  pocketDetailWithReturnsFeatureName,
  PocketDetailWithReturnsState
} from './store/pocket-detail-with-returns.state';
import { pocketDetailWithReturnsReducer } from './store/pocket-detail-with-returns.reducer';
import { PocketDetailWithReturnsPageRoutingModule } from './pocket-detail-with-returns-routing.module';
import { PocketsModule } from '../../pockets.module';
import { TabsComponent } from '@modules/pockets/components/tabs/tabs.component';
import { PocketCardComponent } from './components/pocket-card/pocket-card.component';
import { ToggleComponent } from '@modules/pockets/components/toggle/toggle.component';
import { CommonsModule } from '@app/commons/commons.module';
import { SkeletonPocketDetailComponent } from '@modules/pockets/components/skeleton-pocket-detail/skeleton-pocket-detail.component';
import { PocketWithoutDetailComponent } from '@modules/pockets/components/pocket-without-detail/pocket-without-detail.component';
import { PocketMovementsPageModule } from '@modules/pockets/pages/pocket-movements/pocket-movements.module';
import { PocketCategoryPipe } from '@modules/pockets/pipes/pocket-category.pipe';

export const POCKET_DETAIL_WITH_RETURNS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<PocketDetailWithReturnsState>
>('Pocket Detail With Returns Module State');

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    FormsModule,
    IonicModule,
    PocketDetailWithReturnsPageRoutingModule,
    StoreModule.forFeature(
      pocketDetailWithReturnsFeatureName,
      POCKET_DETAIL_WITH_RETURNS_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([PocketDetailWithReturnsEffect]),
    PocketsModule,
    GlobalPipesModule,
    HeadersModule,
    FeatureToggleDirective,
    CommonsModule,
    SkeletonPocketDetailComponent,
    TabsComponent,
    ToggleComponent,
    PocketWithoutDetailComponent,
    PocketMovementsPageModule,
    PocketCategoryPipe
  ],
  declarations: [PocketDetailWithReturnsPage, PocketCardComponent],
  providers: [
    PocketDetailWithReturnsFacade,
    {
      provide: POCKET_DETAIL_WITH_RETURNS_REDUCER_TOKEN,
      useValue: pocketDetailWithReturnsReducer
    }
  ]
})
export class PocketDetailWithReturnsPageModule {}
