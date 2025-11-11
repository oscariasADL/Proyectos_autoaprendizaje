import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { CreditMovementsFacade } from '@modules/product-options/credit-movements/credit-movements.facade';
import { ThereAreCreditMovementsGuard } from '@modules/product-options/credit-movements/guards/there-are-credit-movements.guard';
import { CreditMovementsService } from '@modules/product-options/credit-movements/services/credit-movements.service';
import { CreditMovementsEffect } from '@modules/product-options/credit-movements/store/credit-movements.effect';
import { creditMovementsReducer } from '@modules/product-options/credit-movements/store/credit-movements.reducer';
import {
  creditMovementsFeatureName,
  CreditMovementsState
} from '@modules/product-options/credit-movements/store/credit-movements.state';

export const CREDIT_MOVEMENTS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<CreditMovementsState>
>('Credit Movements Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(
      creditMovementsFeatureName,
      CREDIT_MOVEMENTS_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([CreditMovementsEffect]),
    GlobalPipesModule,
    FormsAvvModule,
    ReactiveFormsModule
  ],
  exports: [GlobalPipesModule],
  providers: [
    CreditMovementsFacade,
    CreditMovementsService,
    ThereAreCreditMovementsGuard,
    {
      provide: CREDIT_MOVEMENTS_REDUCER_TOKEN,
      useValue: creditMovementsReducer
    }
  ]
})
export class CreditMovementsModule {}
