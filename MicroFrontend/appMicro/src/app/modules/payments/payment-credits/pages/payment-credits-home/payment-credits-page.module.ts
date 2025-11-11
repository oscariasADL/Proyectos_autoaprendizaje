import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';

import { IonicModule } from '@ionic/angular';
import { PaymentCreditsModule } from '@modules/payments/payment-credits/payment-credits.module';
import { SharedModule } from '@modules/shared/shared.module';

import { PaymentCreditsPageRoutingModule } from './payment-credits-routing.module';

import { PaymentCreditsPage } from './payment-credits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentCreditsPageRoutingModule,
    PaymentCreditsModule,
    HeadersModule,
    SharedModule
  ],
  declarations: [PaymentCreditsPage]
})
export class PaymentCreditsPageModule {}
