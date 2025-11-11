import { InjectionToken, NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import {
  virtualCreditCardFeatureName,
  VirtualCreditCardState
} from '@modules/virtual-credit-card/store/virtual-credit-card.state';
import { VirtualCreditCardEffect } from '@modules/virtual-credit-card/store/virtual-credit-card.effect';
import { virtualCreditCardReducer } from '@modules/virtual-credit-card/store/virtual-credit-card.reducer';
import { VirtualCreditCardService } from '@modules/virtual-credit-card/services/virtual-credit-card.service';
import { ActivateVirtualCreditCardConfirmComponent } from '@modules/virtual-credit-card/pages/activate-virtual-credit-card/components/activate-virtual-credit-card-confirm/activate-virtual-credit-card-confirm.component';

export const VIRTUAL_CREDIT_CARD_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<VirtualCreditCardState>
>('Virtual Credit Card Module State');

@NgModule({
  imports: [
    StoreModule.forFeature(
      virtualCreditCardFeatureName,
      VIRTUAL_CREDIT_CARD_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([VirtualCreditCardEffect])
  ],
  providers: [
    VirtualCreditCardFacade,
    VirtualCreditCardService,
    {
      provide: VIRTUAL_CREDIT_CARD_REDUCER_TOKEN,
      useValue: virtualCreditCardReducer
    }
  ]
})
export class VirtualCreditCardModule {}
