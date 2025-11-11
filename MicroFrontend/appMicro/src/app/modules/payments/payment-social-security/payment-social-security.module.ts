import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { SocialSecurityContributorComponent } from '@modules/payments/payment-social-security/components/social-security-contributor/social-security-contributor.component';
import { SocialSecurityValueComponent } from '@modules/payments/payment-social-security/components/social-security-value/social-security-value.component';
import { SocialSecurityWorksheetComponent } from '@modules/payments/payment-social-security/components/social-security-worksheet/social-security-worksheet.component';
import { PaymentSocialSecurityFacade } from '@modules/payments/payment-social-security/payment-social-security.facade';
import { PaymentSocialSecurityService } from '@modules/payments/payment-social-security/services/payment-social-security.service';
import { PaymentSocialSecurityEffect } from '@modules/payments/payment-social-security/store/payment-social-security.effect';
import { paymentSocialSecurityReducer } from '@modules/payments/payment-social-security/store/payment-social-security.reducer';
import {
  paymentSocialSecurityFeatureName,
  PaymentSocialSecurityState
} from '@modules/payments/payment-social-security/store/payment-social-security.state';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { PaymentSocialSecurityPageRoutingModule } from './payment-social-security-routing.module';
import { PaymentSocialSecurityPage } from './payment-social-security.page';

export const PAYMENT_SOCIAL_SECURITY_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<PaymentSocialSecurityState>
>('Payment Social Security Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentSocialSecurityPageRoutingModule,
    StoreModule.forFeature(
      paymentSocialSecurityFeatureName,
      PAYMENT_SOCIAL_SECURITY_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([PaymentSocialSecurityEffect]),
    GenericStepperModule,
    GlobalPipesModule,
    FormsAvvModule,
    ReactiveFormsModule
  ],
  declarations: [
    PaymentSocialSecurityPage,
    SocialSecurityContributorComponent,
    SocialSecurityWorksheetComponent,
    SocialSecurityValueComponent
  ],
  providers: [
    PaymentSocialSecurityFacade,
    PaymentSocialSecurityService,
    {
      provide: PAYMENT_SOCIAL_SECURITY_REDUCER_TOKEN,
      useValue: paymentSocialSecurityReducer
    }
  ]
})
export class PaymentSocialSecurityPageModule {}
