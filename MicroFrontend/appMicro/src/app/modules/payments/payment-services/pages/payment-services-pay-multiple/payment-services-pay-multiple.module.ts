import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PaymentServicesPayMultiplePageRoutingModule } from './payment-services-pay-multiple-routing.module';
import { PaymentServicesPayMultiplePage } from './payment-services-pay-multiple.page';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { PaymentServicesModule } from '@modules/payments/payment-services/payment-services.module';
import { PaymentServicesListComponent } from '@modules/payments/payment-services/pages/payment-services-pay-multiple/components/payment-services-list/payment-services-list.component';
import { PaymentServiceCardComponent } from '@modules/payments/payment-services/pages/payment-services-pay-multiple/components/payment-service-card/payment-service-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentServicesPayMultiplePageRoutingModule,
    GenericStepperModule,
    PaymentServicesModule,
    ReactiveFormsModule
  ],
  declarations: [
    PaymentServicesPayMultiplePage,
    PaymentServicesListComponent,
    PaymentServiceCardComponent
  ]
})
export class PaymentServicesPayMultiplePageModule {}
