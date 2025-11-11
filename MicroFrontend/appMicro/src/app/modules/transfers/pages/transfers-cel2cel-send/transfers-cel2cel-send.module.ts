import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransfersCel2celSendPageRoutingModule } from './transfers-cel2cel-send-routing.module';

import { TransfersCel2celSendPage } from './transfers-cel2cel-send.page';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import {
  transfersCel2celFeatureName,
  TransfersCel2celState
} from '@modules/transfers/pages/transfers-cel2cel-send/store/transfers-cel2cel-send.state';
import { EffectsModule } from '@ngrx/effects';
import { TransfersCel2celEffect } from '@modules/transfers/pages/transfers-cel2cel-send/store/transfers-cel2cel-send.effect';
import { TransfersCel2celSendService } from '@modules/transfers/pages/transfers-cel2cel-send/services/transfers-cel2cel-send.service';
import { transfersCel2celReducer } from '@modules/transfers/pages/transfers-cel2cel-send/store/transfers-cel2cel-send.reducer';
import { TransfersCel2celFacade } from '@modules/transfers/pages/transfers-cel2cel-send/transfers-cel2cel-send.facade';
import { TransfersModule } from '@modules/transfers/transfers.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ProductModule } from '@modules/product/product.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { TransfersCel2celSendTowardComponent } from '@modules/transfers/pages/transfers-cel2cel-send/components/transfers-cel2cel-send-toward/transfers-cel2cel-send-toward.component';
import { TransfersCel2celSendBankComponent } from '@modules/transfers/pages/transfers-cel2cel-send/components/transfers-cel2cel-send-bank/transfers-cel2cel-send-bank.component';
import { CommonsModule } from '@commons/commons.module';

export const TRANSFERS_CEL2CEL_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<TransfersCel2celState>
>('Transfers Cel2Cel Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersModule,
    FormsAvvModule,
    ProductModule,
    GlobalPipesModule,
    GenericStepperModule,
    ReactiveFormsModule,
    TransfersCel2celSendPageRoutingModule,
    StoreModule.forFeature(
      transfersCel2celFeatureName,
      TRANSFERS_CEL2CEL_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([TransfersCel2celEffect]),
    CommonsModule
  ],
  declarations: [
    TransfersCel2celSendPage,
    TransfersCel2celSendTowardComponent,
    TransfersCel2celSendBankComponent
  ],
  providers: [
    TransfersCel2celFacade,
    TransfersCel2celSendService,
    {
      provide: TRANSFERS_CEL2CEL_REDUCER_TOKEN,
      useValue: transfersCel2celReducer
    }
  ]
})
export class TransfersCel2celSendPageModule {}
