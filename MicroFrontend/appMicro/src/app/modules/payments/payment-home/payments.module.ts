import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FindOtherFeaturesModule } from '@commons/components/find-other-features/find-other-features.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { PaymentsFacade } from '@modules/payments/payment-home/payments.facade';

import { PaymentsPageRoutingModule } from './payments-routing.module';

import { PaymentsPage } from './payments.page';
import { FeatureToggleDirective } from '@commons/directives/feature-toggle/feature-toggle.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentsPageRoutingModule,
    GlobalPipesModule,
    HeadersModule,
    FindOtherFeaturesModule,
    FeatureToggleDirective
  ],
  declarations: [PaymentsPage],
  providers: [PaymentsFacade]
})
export class PaymentsPageModule {}
