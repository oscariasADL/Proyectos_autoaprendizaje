import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { PocketCreateEffect } from '@modules/pockets/pages/pocket-create/store/pocket-create.effect';
import { PocketsModule } from '@modules/pockets/pockets.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { EffectsModule } from '@ngrx/effects';
import { PocketCreateWithReturnsPage } from './pocket-create-with-returns.page';
import { PocketCreateWithReturnsPageRoutingModule } from './pocket-create-with-returns-routing.module';
import { ConfigurationStepComponent } from './components/configuration-step/configuration-step.component';
import { FormsAvvModule } from '@app/modules/forms-avv/forms-avv.module';
import { ConfirmationStepComponent } from './components/confirmation-step/confirmation-step.component';
import { VoucherModule } from '@app/commons/components/voucher/voucher.module';
import { CreatePocketEffects } from './store/create-pocket-with-returns.effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import {
  pocketWithReturnsFeatureName,
  PocketWithReturnsState
} from './store/create-pocket-with-returns.state';
import { pocketsWithReturnsReducer } from './store/create-pocket-with-returns.reducer';
import { CommonsModule } from '@app/commons/commons.module';
import { PocketCreateCustomizationComponent } from '@modules/pockets/components/pocket-create-customization/pocket-create-customization.component';

export const POCKETS_HOME_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<PocketWithReturnsState>
>('Pockets with returns state');

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    FormsModule,
    IonicModule,
    PocketCreateWithReturnsPageRoutingModule,
    PocketsModule,
    StoreModule.forFeature(
      pocketWithReturnsFeatureName,
      POCKETS_HOME_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([PocketCreateEffect, CreatePocketEffects]),
    GenericStepperModule,
    GlobalPipesModule,
    ReactiveFormsModule,
    FormsAvvModule,
    VoucherModule,
    PocketCreateCustomizationComponent
  ],
  declarations: [
    PocketCreateWithReturnsPage,
    ConfigurationStepComponent,
    ConfirmationStepComponent
  ],
  providers: [
    {
      provide: POCKETS_HOME_REDUCER_TOKEN,
      useValue: pocketsWithReturnsReducer
    }
  ]
})
export class PocketCreateWithReturnsPageModule {}
