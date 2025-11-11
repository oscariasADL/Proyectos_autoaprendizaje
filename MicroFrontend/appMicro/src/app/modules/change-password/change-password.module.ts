import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { ChangePasswordFacade } from '@modules/change-password/change-password.facade';
import { CompletedPasswordComponent } from '@modules/change-password/components/completed-password/completed-password.component';
import { CurrentPasswordComponent } from '@modules/change-password/components/current-password/current-password.component';
import { NewPasswordComponent } from '@modules/change-password/components/new-password/new-password.component';
import { ChangePasswordService } from '@modules/change-password/services/change-password.service';
import { ChangePasswordEffect } from '@modules/change-password/store/change-password.effect';
import { changePasswordReducer } from '@modules/change-password/store/change-password.reducer';
import {
  changePasswordFeatureName,
  ChangePasswordState
} from '@modules/change-password/store/change-password.state';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ChangePasswordPageRoutingModule } from './change-password-routing.module';
import { ChangePasswordPage } from './change-password.page';

export const CHANGE_PASSWORD_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ChangePasswordState>
>('Change Password Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePasswordPageRoutingModule,
    StoreModule.forFeature(
      changePasswordFeatureName,
      CHANGE_PASSWORD_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([ChangePasswordEffect]),
    HeadersModule,
    FormsAvvModule,
    GlobalPipesModule,
    ReactiveFormsModule
  ],
  declarations: [
    ChangePasswordPage,
    NewPasswordComponent,
    CurrentPasswordComponent,
    CompletedPasswordComponent
  ],
  providers: [
    ChangePasswordFacade,
    ChangePasswordService,
    {
      provide: CHANGE_PASSWORD_REDUCER_TOKEN,
      useValue: changePasswordReducer
    }
  ]
})
export class ChangePasswordPageModule {}
