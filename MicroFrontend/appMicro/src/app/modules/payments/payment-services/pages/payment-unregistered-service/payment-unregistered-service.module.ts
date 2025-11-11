import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { PaymentServicesModule } from '../../payment-services.module';
import { PaymentUnregisteredServicePageRoutingModule } from './payment-unregistered-service-routing.module';
import { PaymentUnregisteredServicePage } from './payment-unregistered-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentUnregisteredServicePageRoutingModule,
    GenericStepperModule,
    PaymentServicesModule
  ],
  declarations: [PaymentUnregisteredServicePage]
})
export class PaymentUnregisteredServicePageModule {}
