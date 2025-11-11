import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ServicesPayGuard } from '@modules/payments/payment-services/pages/payment-services-pay/guards/services-pay.guard';
import { PaymentServicesModule } from '@modules/payments/payment-services/payment-services.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { PaymentServicesPayPageRoutingModule } from './payment-services-pay-routing.module';
import { PaymentServicesPayPage } from './payment-services-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentServicesPayPageRoutingModule,
    GenericStepperModule,
    PaymentServicesModule
  ],
  declarations: [PaymentServicesPayPage],
  providers: [ServicesPayGuard]
})
export class PaymentServicesPayPageModule {}
