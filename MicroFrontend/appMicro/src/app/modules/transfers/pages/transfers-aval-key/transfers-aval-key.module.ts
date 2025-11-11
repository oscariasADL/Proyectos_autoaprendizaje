import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransfersAvalKeyPageRoutingModule } from './transfers-aval-key-routing.module';

import { TransfersAvalKeyPage } from './transfers-aval-key.page';
import { ProductModule } from '@modules/product/product.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { CommonsModule } from '@commons/commons.module';
import { TransfersAvalKeyTowardComponent } from '@modules/transfers/pages/transfers-aval-key/components/transfers-aval-key-toward/transfers-aval-key-toward.component';
import { TransfersAvalKeyFacade } from '@modules/transfers/pages/transfers-aval-key/transfers-aval-key.facade';
import { TransfersModule } from '@modules/transfers/transfers.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { TransfersAvalKeyService } from '@modules/transfers/pages/transfers-aval-key/services/transfers-aval-key.service';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import {
  transfersAvalKeyFeatureName,
  TransfersAvalKeyState
} from '@modules/transfers/pages/transfers-aval-key/store/transfers-aval-key.state';
import { transfersAvalKeyReducer } from '@modules/transfers/pages/transfers-aval-key/store/transfers-aval-key.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TransfersAvalKeyEffect } from '@modules/transfers/pages/transfers-aval-key/store/transfers-aval-key.effect';

export const TRANSFERS_AVAL_KEY_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<TransfersAvalKeyState>
>('Transfers Aval Key Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductModule,
    GlobalPipesModule,
    GenericStepperModule,
    ReactiveFormsModule,
    TransfersAvalKeyPageRoutingModule,
    CommonsModule,
    TransfersModule,
    FormsAvvModule,
    StoreModule.forFeature(
      transfersAvalKeyFeatureName,
      TRANSFERS_AVAL_KEY_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([TransfersAvalKeyEffect])
  ],
  declarations: [TransfersAvalKeyPage, TransfersAvalKeyTowardComponent],
  providers: [
    TransfersAvalKeyFacade,
    TransfersAvalKeyService,
    {
      provide: TRANSFERS_AVAL_KEY_REDUCER_TOKEN,
      useValue: transfersAvalKeyReducer
    }
  ]
})
export class TransfersAvalKeyPageModule {}
