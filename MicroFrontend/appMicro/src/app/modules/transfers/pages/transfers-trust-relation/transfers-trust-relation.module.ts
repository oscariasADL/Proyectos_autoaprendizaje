import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { TransfersTrustRelationService } from '@modules/transfers/pages/transfers-trust-relation/service/transfers-trust-relation.service';
import { TransfersTrustRelationEffect } from '@modules/transfers/pages/transfers-trust-relation/store/transfers-trust-relation.effect';
import { trustRelationReducer } from '@modules/transfers/pages/transfers-trust-relation/store/transfers-trust-relation.reducer';
import {
  trustRelationFeatureName,
  TrustRelationState
} from '@modules/transfers/pages/transfers-trust-relation/store/transfers-trust-relation.state';
import { TransfersTrustRelationFacade } from '@modules/transfers/pages/transfers-trust-relation/transfers-trust-relation.facade';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { TransfersTrustRelationPageRoutingModule } from './transfers-trust-relation-routing.module';

import { TransfersTrustRelationPage } from './transfers-trust-relation.page';

export const TRUST_RELATION_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<TrustRelationState>
>('Trust Relation Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersTrustRelationPageRoutingModule,
    StoreModule.forFeature(
      trustRelationFeatureName,
      TRUST_RELATION_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([TransfersTrustRelationEffect]),
    HeadersModule,
    GlobalPipesModule,
    FormsAvvModule
  ],
  providers: [
    TransfersTrustRelationFacade,
    TransfersTrustRelationService,
    {
      provide: TRUST_RELATION_REDUCER_TOKEN,
      useValue: trustRelationReducer
    }
  ],
  declarations: [TransfersTrustRelationPage]
})
export class TransfersTrustRelationPageModule {}
