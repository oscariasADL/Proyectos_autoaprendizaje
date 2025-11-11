import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { PayLoanAmountComponent } from '@modules/payments/payment-credits/components/pay-loan-amount/pay-loan-amount.component';
import { PayLoanTypeComponent } from '@modules/payments/payment-credits/components/pay-loan-type/pay-loan-type.component';
import { PaymentCreditsFacade } from '@modules/payments/payment-credits/payment-credits.facade';
import { PaymentCreditCardPipe } from '@modules/payments/payment-credits/pipes/payment-credit-card.pipe';
import { PaymentCreditsService } from '@modules/payments/payment-credits/services/payment-credits.service';
import { PaymentCreditsEffect } from '@modules/payments/payment-credits/store/payment-credits.effect';
import { paymentCreditsReducer } from '@modules/payments/payment-credits/store/payment-credits.reducer';
import {
  paymentCreditsFeatureName,
  PaymentCreditsState
} from '@modules/payments/payment-credits/store/payment-credits.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

export const PAYMENT_CREDITS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<PaymentCreditsState>
>('Payment Credits Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(
      paymentCreditsFeatureName,
      PAYMENT_CREDITS_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([PaymentCreditsEffect]),
    GlobalPipesModule,
    FormsAvvModule
  ],
  declarations: [
    PaymentCreditCardPipe,
    PayLoanAmountComponent,
    PayLoanTypeComponent
  ],
  exports: [
    GlobalPipesModule,
    PayLoanAmountComponent,
    PayLoanTypeComponent,
    PaymentCreditCardPipe
  ],
  providers: [
    PaymentCreditCardPipe,
    PaymentCreditsFacade,
    PaymentCreditsService,
    {
      provide: PAYMENT_CREDITS_REDUCER_TOKEN,
      useValue: paymentCreditsReducer
    }
  ]
})
export class PaymentCreditsModule {}
