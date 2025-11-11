import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from '@commons/components/footer/footer.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { LoginBiometricComponent } from '@modules/auth/login/components/login-biometric/login-biometric.component';
import { LoginDocumentComponent } from '@modules/auth/login/components/login-document/login-document.component';
import { LoginPasswordComponent } from '@modules/auth/login/components/login-password/login-password.component';
import { LoginRoutingModule } from '@modules/auth/login/login-routing.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { FormsAvvModule } from '../../forms-avv/forms-avv.module';
import { LoginFacade } from './login.facade';
import { LoginPage } from './login.page';
import { LoginEffect } from './store/login.effect';
import { loginReducer } from './store/login.reducer';
import { loginFeatureName, LoginState } from './store/login.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<LoginState>
>('Login Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    StoreModule.forFeature(loginFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([LoginEffect]),
    GlobalPipesModule,
    FormsAvvModule,
    TranslateModule,
    FooterModule,
    NotificationsModule
  ],
  declarations: [
    LoginPage,
    LoginDocumentComponent,
    LoginPasswordComponent,
    LoginBiometricComponent
  ],
  providers: [
    LoginFacade,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: loginReducer
    }
  ]
})
export class LoginPageModule {}
