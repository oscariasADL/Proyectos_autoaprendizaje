import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { SecurityBiometricAlertComponent } from '@modules/security/security-biometrics/components/security-biometric-alert/security-biometric-alert.component';
import { SecurityBiometricErrorComponent } from '@modules/security/security-biometrics/components/security-biometric-error/security-biometric-error.component';
import { SecurityBiometricFinishedComponent } from '@modules/security/security-biometrics/components/security-biometric-finished/security-biometric-finished.component';
import { SecurityBiometricPasswordComponent } from '@modules/security/security-biometrics/components/security-biometric-password/security-biometric-password.component';
import { SecurityBiometricsGuard } from '@modules/security/security-biometrics/guards/security-biometrics.guard';
import { SecurityBiometricsFacade } from '@modules/security/security-biometrics/security-biometrics.facade';
import { SecurityBiometricsService } from '@modules/security/security-biometrics/services/security-biometrics.service';
import { SecurityBiometricsEffect } from '@modules/security/security-biometrics/store/security-biometrics.effect';
import { securityBiometricsReducer } from '@modules/security/security-biometrics/store/security-biometrics.reducer';
import {
  securityBiometricsFeatureName,
  SecurityBiometricsState
} from '@modules/security/security-biometrics/store/security-biometrics.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { SecurityBiometricsPageRoutingModule } from './security-biometrics-routing.module';
import { SecurityBiometricsPage } from './security-biometrics.page';
import { RsaBiometricsService } from './services/rsa-biometrics.service';

export const SECURITY_BIOMETRICS_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<SecurityBiometricsState>
>('Security Biometrics Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityBiometricsPageRoutingModule,
    StoreModule.forFeature(
      securityBiometricsFeatureName,
      SECURITY_BIOMETRICS_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([SecurityBiometricsEffect]),
    HeadersModule,
    GlobalPipesModule,
    FormsAvvModule
  ],
  declarations: [
    SecurityBiometricsPage,
    SecurityBiometricAlertComponent,
    SecurityBiometricErrorComponent,
    SecurityBiometricPasswordComponent,
    SecurityBiometricFinishedComponent
  ],
  providers: [
    SecurityBiometricsGuard,
    SecurityBiometricsFacade,
    SecurityBiometricsService,
    RsaBiometricsService,
    {
      provide: SECURITY_BIOMETRICS_REDUCER_TOKEN,
      useValue: securityBiometricsReducer
    }
  ]
})
export class SecurityBiometricsPageModule {}
