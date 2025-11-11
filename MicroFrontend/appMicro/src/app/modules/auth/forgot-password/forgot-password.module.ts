import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AuthStepsModule } from '@modules/auth/auth-steps/auth-steps.module';
import { ForgotPasswordRoutingModule } from '@modules/auth/forgot-password/forgot-password-routing.module';
import { ForgotPasswordFacade } from '@modules/auth/forgot-password/forgot-password.facade';
import { ForgotPasswordService } from '@modules/auth/forgot-password/forgot-password.service';
import { ForgotPasswordResolver } from '@modules/auth/forgot-password/guards/forgot-password.resolver';
import { ForgotPasswordEffect } from '@modules/auth/forgot-password/store/forgot-password.effect';
import { forgotPasswordReducer } from '@modules/auth/forgot-password/store/forgot-password.reducer';
import {
  forgotPasswordFeatureName,
  ForgotPasswordState
} from '@modules/auth/forgot-password/store/forgot-password.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

export const FORGOT_PASSWORD_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ForgotPasswordState>
>('Forgot Password Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordRoutingModule,
    StoreModule.forFeature(
      forgotPasswordFeatureName,
      FORGOT_PASSWORD_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([ForgotPasswordEffect]),
    AuthStepsModule
  ],
  providers: [
    ForgotPasswordFacade,
    ForgotPasswordService,
    ForgotPasswordResolver,
    {
      provide: FORGOT_PASSWORD_REDUCER_TOKEN,
      useValue: forgotPasswordReducer
    }
  ]
})
export class ForgotPasswordModule {}
