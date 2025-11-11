import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ComplementaryServicesCompleteComponent } from '@modules/security/security-complementary-services/components/complementary-services-complete/complementary-services-complete.component';
import { ComplementaryServicesInfoComponent } from '@modules/security/security-complementary-services/components/complementary-services-info/complementary-services-info.component';
import { ComplementaryServicesOtpComponent } from '@modules/security/security-complementary-services/components/complementary-services-otp/complementary-services-otp.component';
import { ComplementaryServicesQuestionComponent } from '@modules/security/security-complementary-services/components/complementary-services-question/complementary-services-question.component';
import { ComplementaryServicesRequestInfoComponent } from '@modules/security/security-complementary-services/components/complementary-services-request-info/complementary-services-request-info.component';
import { ComplementaryServicesStep } from '@modules/security/security-complementary-services/entities/complementary-services.interface';
import { SecurityComplementaryServicesFacade } from '@modules/security/security-complementary-services/security-complementary-services.facade';
import { ComplementaryServicesEffect } from '@modules/security/security-complementary-services/store/complementary-services.effect';
import { complementaryServicesReducer } from '@modules/security/security-complementary-services/store/complementary-services.reducer';
import { complementaryServicesFeatureName } from '@modules/security/security-complementary-services/store/complementary-services.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { SecurityComplementaryServicesPageRoutingModule } from './security-complementary-services-routing.module';
import { SecurityComplementaryServicesPage } from './security-complementary-services.page';
import { ComplementaryServicesFailedComponent } from '@modules/security/security-complementary-services/components/complementary-services-failed/complementary-services-failed.component';

export const COMPLEMENTARY_SERVICES_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ComplementaryServicesStep>
>('Complementary Services Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityComplementaryServicesPageRoutingModule,
    HeadersModule,
    StoreModule.forFeature(
      complementaryServicesFeatureName,
      COMPLEMENTARY_SERVICES_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([ComplementaryServicesEffect]),
    GlobalPipesModule,
    FormsAvvModule
  ],
  declarations: [
    SecurityComplementaryServicesPage,
    ComplementaryServicesOtpComponent,
    ComplementaryServicesInfoComponent,
    ComplementaryServicesQuestionComponent,
    ComplementaryServicesCompleteComponent,
    ComplementaryServicesRequestInfoComponent,
    ComplementaryServicesFailedComponent
  ],
  providers: [
    SecurityComplementaryServicesFacade,
    {
      provide: COMPLEMENTARY_SERVICES_REDUCER_TOKEN,
      useValue: complementaryServicesReducer
    }
  ]
})
export class SecurityComplementaryServicesPageModule {}
