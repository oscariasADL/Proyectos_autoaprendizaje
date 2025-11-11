import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AuthStepsModule } from '@modules/auth/auth-steps/auth-steps.module';
import { RegisterResolver } from '@modules/auth/register/guards/register.resolver';
import { RegisterFacade } from '@modules/auth/register/register.facade';
import { RegisterService } from '@modules/auth/register/register.service';
import { RegisterEffect } from '@modules/auth/register/store/register.effect';
import { registerReducer } from '@modules/auth/register/store/register.reducer';
import {
  registerFeatureName,
  RegisterState
} from '@modules/auth/register/store/register.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { RegisterRoutingModule } from './register-routing.module';

export const REGISTER_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<RegisterState>
>('Register Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterRoutingModule,
    StoreModule.forFeature(registerFeatureName, REGISTER_REDUCER_TOKEN),
    EffectsModule.forFeature([RegisterEffect]),
    AuthStepsModule
  ],
  providers: [
    RegisterFacade,
    RegisterService,
    RegisterResolver,
    {
      provide: REGISTER_REDUCER_TOKEN,
      useValue: registerReducer
    }
  ]
})
export class RegisterModule {}
