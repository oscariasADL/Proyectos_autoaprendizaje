import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { HeadersModule } from '@commons/components/headers/headers.module';

import { IonicModule } from '@ionic/angular';
import { PocketDeleteModule } from '@modules/pockets/pages/pocket-delete/pocket-delete.module';
import { PocketDetailFacade } from '@modules/pockets/pages/pocket-detail/pocket-detail.facade';
import { PocketDetailEffect } from '@modules/pockets/pages/pocket-detail/store/pocket-detail.effect';
import { pocketDetailReducer } from '@modules/pockets/pages/pocket-detail/store/pocket-detail.reducer';
import {
  pocketDetailFeatureName,
  PocketDetailState
} from '@modules/pockets/pages/pocket-detail/store/pocket-detail.state';
import { PocketStatusModule } from '@modules/pockets/pages/pocket-status/pocket-status.module';
import { PocketsModule } from '@modules/pockets/pockets.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { PocketDetailPageRoutingModule } from './pocket-detail-routing.module';

import { PocketDetailPage } from './pocket-detail.page';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';
import { SkeletonPocketDetailComponent } from '@modules/pockets/components/skeleton-pocket-detail/skeleton-pocket-detail.component';
import { PocketWithoutDetailComponent } from '@modules/pockets/components/pocket-without-detail/pocket-without-detail.component';
import { TabsComponent } from '@modules/pockets/components/tabs/tabs.component';
import { ToggleComponent } from '@modules/pockets/components/toggle/toggle.component';
import { PocketMovementsPageModule } from '@modules/pockets/pages/pocket-movements/pocket-movements.module';
import { CommonsModule } from '@commons/commons.module';
import { PocketCategoryPipe } from '@modules/pockets/pipes/pocket-category.pipe';

export const POCKET_DETAIL_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<PocketDetailState>
>('Pocket Detail Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PocketDetailPageRoutingModule,
    StoreModule.forFeature(
      pocketDetailFeatureName,
      POCKET_DETAIL_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([PocketDetailEffect]),
    PocketsModule,
    PocketStatusModule,
    PocketDeleteModule,
    GlobalPipesModule,
    HeadersModule,
    FeatureToggleDirective,
    SkeletonPocketDetailComponent,
    PocketWithoutDetailComponent,
    TabsComponent,
    ToggleComponent,
    PocketMovementsPageModule,
    CommonsModule,
    PocketCategoryPipe
  ],
  declarations: [PocketDetailPage],
  providers: [
    PocketDetailFacade,
    {
      provide: POCKET_DETAIL_REDUCER_TOKEN,
      useValue: pocketDetailReducer
    }
  ]
})
export class PocketDetailPageModule {}
