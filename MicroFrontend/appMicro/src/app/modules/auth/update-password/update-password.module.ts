import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { LoginState } from '@modules/auth/login/store/login.state';
import { UpdatePasswordService } from '@modules/auth/update-password/services/update-password.service';
import { UpdatePasswordEffect } from '@modules/auth/update-password/store/update-password.effect';
import { updatePasswordReducer } from '@modules/auth/update-password/store/update-password.reducer';
import { updatePasswordFeatureName } from '@modules/auth/update-password/store/update-password.state';
import { UpdatePasswordFacade } from '@modules/auth/update-password/update-password.facade';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { UpdatePasswordPageRoutingModule } from './update-password-routing.module';

import { UpdatePasswordPage } from './update-password.page';

export const UPDATE_PASSWORD_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<LoginState>
>('Update Password Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePasswordPageRoutingModule,
    HeadersModule,
    GlobalPipesModule,
    FormsAvvModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([UpdatePasswordEffect]),
    StoreModule.forFeature(
      updatePasswordFeatureName,
      UPDATE_PASSWORD_REDUCER_TOKEN
    )
  ],
  declarations: [UpdatePasswordPage],
  providers: [
    UpdatePasswordFacade,
    UpdatePasswordService,
    {
      provide: UPDATE_PASSWORD_REDUCER_TOKEN,
      useValue: updatePasswordReducer
    }
  ]
})
export class UpdatePasswordPageModule {}
