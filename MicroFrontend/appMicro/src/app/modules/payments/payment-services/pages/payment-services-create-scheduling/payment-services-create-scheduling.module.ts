import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PaymentServicesCreateSchedulingPageRoutingModule } from './payment-services-create-scheduling-routing.module';
import { PaymentServicesCreateSchedulingPage } from './payment-services-create-scheduling.page';
import { PaymentServicesModule } from '@modules/payments/payment-services/payment-services.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { VoucherModule } from '@commons/components/voucher/voucher.module';
import { CreateSchedulingConfirmComponent } from '@modules/payments/payment-services/pages/payment-services-create-scheduling/components/create-scheduling-confirm/create-scheduling-confirm.component';
import { CreateSchedulingComponent } from '@modules/payments/payment-services/pages/payment-services-create-scheduling/components/create-scheduling/create-scheduling.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentServicesCreateSchedulingPageRoutingModule,
    PaymentServicesModule,
    HeadersModule,
    ReactiveFormsModule,
    FormsAvvModule,
    VoucherModule
  ],
  declarations: [
    PaymentServicesCreateSchedulingPage,
    CreateSchedulingComponent,
    CreateSchedulingConfirmComponent
  ]
})
export class PaymentServicesCreateSchedulingPageModule {}
