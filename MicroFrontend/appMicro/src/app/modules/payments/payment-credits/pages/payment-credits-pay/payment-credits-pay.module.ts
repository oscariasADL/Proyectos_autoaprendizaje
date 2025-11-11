import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PaymentCreditsModule } from '@modules/payments/payment-credits/payment-credits.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';

import { PaymentCreditsPayPageRoutingModule } from './payment-credits-pay-routing.module';

import { PaymentCreditsPayPage } from './payment-credits-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentCreditsPayPageRoutingModule,
    PaymentCreditsModule,
    GenericStepperModule
  ],
  declarations: [PaymentCreditsPayPage]
})
export class PaymentCreditsPayPageModule {}
