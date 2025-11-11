import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TransfersDefaultAccountPageRoutingModule } from './transfers-default-account-routing.module';

import { TransfersDefaultAccountPage } from './transfers-default-account.page';
import {
  transfersDefaultAccountFeatureName,
  TransfersDefaultAccountState
} from '@modules/transfers/pages/transfers-default-account/store/transfers-default-account.state';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { TransfersDefaultAccountEffect } from '@modules/transfers/pages/transfers-default-account/store/transfers-default-account.effect';
import { transfersDefaultAccountReducer } from '@modules/transfers/pages/transfers-default-account/store/transfers-default-account.reducer';
import { TransfersDefaultAccountFacade } from '@modules/transfers/pages/transfers-default-account/transfers-default-account.facade';
import { TransfersAccountDefaultService } from '@modules/transfers/pages/transfers-default-account/services/transfers-account-default.service';
import { HeadersModule } from '@commons/components/headers/headers.module';

export const TRANSFERS_DEFAULT_ACCOUNT_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<TransfersDefaultAccountState>
>('Transfers Aval Key Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlobalPipesModule,
    TransfersDefaultAccountPageRoutingModule,
    StoreModule.forFeature(
      transfersDefaultAccountFeatureName,
      TRANSFERS_DEFAULT_ACCOUNT_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([TransfersDefaultAccountEffect]),
    HeadersModule
  ],
  declarations: [TransfersDefaultAccountPage],
  providers: [
    TransfersDefaultAccountFacade,
    TransfersAccountDefaultService,
    {
      provide: TRANSFERS_DEFAULT_ACCOUNT_REDUCER_TOKEN,
      useValue: transfersDefaultAccountReducer
    }
  ]
})
export class TransfersDefaultAccountPageModule {}
