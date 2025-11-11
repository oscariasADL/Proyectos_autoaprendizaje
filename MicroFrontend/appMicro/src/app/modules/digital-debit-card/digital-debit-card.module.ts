import { InjectionToken, NgModule } from '@angular/core';

import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';
import { DigitalDebitCardService } from '@modules/digital-debit-card/service/digital-debit-card.service';
import { DigitalDebitCardEffect } from '@modules/digital-debit-card/store/digital-debit-card.effect';
import { digitalDebitCardReducer } from '@modules/digital-debit-card/store/digital-debit-card.reducer';
import {
  digitalDebitCardFeatureName,
  DigitalDebitCardState
} from '@modules/digital-debit-card/store/digital-debit-card.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

export const DIGITAL_DEBIT_CARD_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<DigitalDebitCardState>
>('QR Pay Module State');

@NgModule({
  imports: [
    StoreModule.forFeature(
      digitalDebitCardFeatureName,
      DIGITAL_DEBIT_CARD_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([DigitalDebitCardEffect])
  ],
  providers: [
    DigitalDebitCardFacade,
    DigitalDebitCardService,
    {
      provide: DIGITAL_DEBIT_CARD_REDUCER_TOKEN,
      useValue: digitalDebitCardReducer
    }
  ]
})
export class DigitalDebitCardModule {}
