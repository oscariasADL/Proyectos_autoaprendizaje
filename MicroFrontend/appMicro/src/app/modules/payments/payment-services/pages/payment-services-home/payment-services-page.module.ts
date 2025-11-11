import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';

import { IonicModule } from '@ionic/angular';
import { PaymentServicesPage } from '@modules/payments/payment-services/pages/payment-services-home/payment-services.page';
import { ServiceCardPipe } from '@modules/payments/payment-services/pages/payment-services-home/pipes/service-card.pipe';
import { PaymentServicesModule } from '@modules/payments/payment-services/payment-services.module';
import { SharedModule } from '@modules/shared/shared.module';

import { PaymentServicesPageRoutingModule } from './payment-services-routing.module';
import { ServicePaymentCardComponent } from '@modules/payments/payment-services/pages/payment-services-home/components/service-payment-card/service-payment-card.component';
import { CommonsModule } from '@commons/commons.module';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentServicesPageRoutingModule,
    PaymentServicesModule,
    SharedModule,
    HeadersModule,
    CommonsModule,
    FeatureToggleDirective
  ],
  declarations: [
    PaymentServicesPage,
    ServicePaymentCardComponent,
    ServiceCardPipe
  ],
  providers: [ServiceCardPipe]
})
export class PaymentServicesPageModule {}
