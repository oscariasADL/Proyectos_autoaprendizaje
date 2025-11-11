import { CommonModule, TitleCasePipe } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchListModule } from '@commons/components/search-list/search-list.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { PaymentServicesState } from '@modules/payments/payment-services/store/payment-services.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { PaymentsTaxesStepAgreementComponent } from './components/payments-taxes-step-agreement/payments-taxes-step-agreement.component';
import { PaymentsTaxesStepCityComponent } from './components/payments-taxes-step-city/payments-taxes-step-city.component';
import { PaymentsTaxesStepReferenceComponent } from './components/payments-taxes-step-reference/payments-taxes-step-reference.component';
import { PaymentTaxesFacade } from './payment-taxes.facade';
import { PaymentTaxesService } from './services/payment-taxes.service';
import { PaymentTaxesEffect } from './store/payment-taxes.effect';
import { paymentTaxesReducer } from './store/payment-taxes.reducer';
import { paymentTaxesfeatureName } from './store/payment-taxes.state';

export const PAYMENT_TAXES_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<PaymentServicesState>
>('Payment taxes Module State');

@NgModule({
  declarations: [
    PaymentsTaxesStepCityComponent,
    PaymentsTaxesStepAgreementComponent,
    PaymentsTaxesStepReferenceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(
      paymentTaxesfeatureName,
      PAYMENT_TAXES_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([PaymentTaxesEffect]),
    GlobalPipesModule,
    FormsAvvModule,
    SearchListModule
  ],
  exports: [
    GlobalPipesModule,
    PaymentsTaxesStepCityComponent,
    PaymentsTaxesStepAgreementComponent,
    PaymentsTaxesStepReferenceComponent
  ],
  providers: [
    PaymentTaxesFacade,
    TitleCasePipe,
    PaymentTaxesService,
    {
      provide: PAYMENT_TAXES_REDUCER_TOKEN,
      useValue: paymentTaxesReducer
    }
  ]
})
export class PaymentTaxesModule {}
