import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { IonicModule } from '@ionic/angular';
import { PocketsHomeEffect } from '@modules/pockets/pages/pockets-home/store/pockets-home.effect';
import { pocketsHomeReducer } from '@modules/pockets/pages/pockets-home/store/pockets-home.reducer';
import {
  pocketsHomeFeatureName,
  PocketsHomeState
} from '@modules/pockets/pages/pockets-home/store/pockets-home.state';
import { PocketsModule } from '@modules/pockets/pockets.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { PocketsHomePageRoutingModule } from './pockets-home-routing.module';
import { PocketsHomePage } from './pockets-home.page';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';
import { CommonsModule } from '@commons/commons.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { PocketCreateOnboardingComponent } from '@modules/pockets/pages/pocket-create-onboarding/pocket-create-onboarding.component';

export const POCKETS_HOME_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<PocketsHomeState>
>('Pockets Home Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PocketsHomePageRoutingModule,
    HeadersModule,
    GlobalPipesModule,
    StoreModule.forFeature(pocketsHomeFeatureName, POCKETS_HOME_REDUCER_TOKEN),
    EffectsModule.forFeature([PocketsHomeEffect]),
    PocketsModule,
    FeatureToggleDirective,
    CommonsModule,
    FormsAvvModule,
    PocketCreateOnboardingComponent
  ],
  declarations: [PocketsHomePage],
  providers: [
    {
      provide: POCKETS_HOME_REDUCER_TOKEN,
      useValue: pocketsHomeReducer
    }
  ]
})
export class PocketsHomePageModule {}
