import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { AppPreloadStrategy } from '@app/app-preload-strategy';
import { CommonsModule } from '@commons/commons.module';
import { TOAST_CONFIGURATION } from '@commons/constants/toast.constants';
import { USER_IDLE_CONFIGURATION } from '@commons/constants/user-idle.constants';
import { BavvMbInterceptor } from '@commons/interceptors/bavv-mb-interceptor';
import { AdlDeviceFingerprintService } from '@commons/services/adl-device-fingerprint.service';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { BootstrapService } from '@commons/services/bootstrap.service';
import { environment as ENV } from '@environment';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';
import { AlertEffect } from '@store/effects/alert.effect';
import { BootstrapEffects } from '@store/effects/bootstrap.effects';
import { ComplementaryServicesEffect } from '@store/effects/complementary-services.effect';
import { ConfigEffect } from '@store/effects/config.effect';
import { LoadingEffect } from '@store/effects/loading.effect';
import { MailboxEffect } from '@store/effects/mailbox.effect';
import { ModalEffect } from '@store/effects/modal.effect';
import { NotificationsEffect } from '@store/effects/notifications.effect';
import { ParameterEffect } from '@store/effects/parameter.effect';
import { ToastEffect } from '@store/effects/toast.effect';
import { globalReducers } from '@store/reducers';
import { clearState } from '@store/reducers/clear.reducer';
import { UserIdleModule } from 'angular-user-idle';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppContainer } from './app.container';
import { AppFacade } from './app.facade';
import { initApp } from './app.helpers';
import { translateConfig } from './app.translate';

//import './commons/capacitor-web-plugins/web-exports';
import './commons/helpers/extend-types.helpers';
import { HomeFacade } from '@modules/home/home.facade';
import { SecurityComplementaryServicesPageModule } from '@modules/security/security-complementary-services/security-complementary-services.module';
import { TransferSurveyQuestionControlService } from '@modules/transfers/service/transfer-survey-question-control.service';
import { GlobalEffect } from '@store/effects/global-effect';
import { PushNotificationRegisterEffect } from '@store/effects/push-notification-register.effect';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NewRelicService } from '@commons/services/new-relic/new-relic.service';
import {
  ALLOWED_CERTIFICATE_CONFIG,
  CERTIFICATE_CONFIG
} from '@commons/interceptors/constants/ssl-pinning.constants';
import { SSLPinningInterceptor } from '@commons/interceptors/ssl-pinning-interceptor';

export const REDUCER_TOKEN = new InjectionToken('Registered Reducers');

@NgModule({
  declarations: [AppContainer],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ swipeBackEnabled: false, mode: 'md' }),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot(translateConfig),
    StoreModule.forRoot(REDUCER_TOKEN, { metaReducers: [clearState] }),
    EffectsModule.forRoot([
      LoadingEffect,
      BootstrapEffects,
      AlertEffect,
      ParameterEffect,
      ConfigEffect,
      ModalEffect,
      ToastEffect,
      NotificationsEffect,
      ComplementaryServicesEffect,
      MailboxEffect,
      GlobalEffect,
      PushNotificationRegisterEffect
    ]),
    CommonsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(TOAST_CONFIGURATION),
    UserIdleModule.forRoot(USER_IDLE_CONFIGURATION),
    ENV.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 35 }),
    // Temporally
    SecurityComplementaryServicesPageModule
  ],
  providers: [
    AppFacade,
    HomeFacade,
    provideNgxMask(),
    //BarcodeScanner,
    FingerprintAIO,
    AppPreloadStrategy,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: REDUCER_TOKEN,
      useValue: globalReducers
    },
    {
      provide: ALLOWED_CERTIFICATE_CONFIG,
      useValue: CERTIFICATE_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SSLPinningInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BavvMbInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [
        AdlSecureStorageService,
        AdlDeviceFingerprintService,
        BootstrapService,
        NewRelicService
      ]
    },
    TransferSurveyQuestionControlService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppContainer]
})
export class AppModule {}
