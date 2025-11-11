import { CommonModule, TitleCasePipe } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { PaymentServicesService } from '@modules/payments/payment-services/services/payment-services.service';
import { PaymentServicesEffect } from '@modules/payments/payment-services/store/payment-services.effect';
import { paymentServicesReducer } from '@modules/payments/payment-services/store/payment-services.reducer';
import {
  paymentServicesFeatureName,
  PaymentServicesState
} from '@modules/payments/payment-services/store/payment-services.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { PaymentUnregisteredStepReferenceComponent } from './components/payment-unregistered-step-reference/payment-unregistered-step-reference.component';
import { PaymentUnregisteredStepServiceComponent } from './components/payment-unregistered-step-service/payment-unregistered-step-service.component';
import { SearchServicesComponent } from './components/search-services/search-services.component';

export const PAYMENT_SERVICES_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<PaymentServicesState>
>('Payment Services Module State');

@NgModule({
  declarations: [
    PaymentUnregisteredStepServiceComponent,
    PaymentUnregisteredStepReferenceComponent,
    SearchServicesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(
      paymentServicesFeatureName,
      PAYMENT_SERVICES_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([PaymentServicesEffect]),
    GlobalPipesModule,
    FormsAvvModule
  ],
  exports: [
    GlobalPipesModule,
    PaymentUnregisteredStepServiceComponent,
    PaymentUnregisteredStepReferenceComponent,
    SearchServicesComponent
  ],
  providers: [
    PaymentServicesFacade,
    PaymentServicesService,
    TitleCasePipe,
    {
      provide: PAYMENT_SERVICES_REDUCER_TOKEN,
      useValue: paymentServicesReducer
    }
  ]
})
export class PaymentServicesModule {}
