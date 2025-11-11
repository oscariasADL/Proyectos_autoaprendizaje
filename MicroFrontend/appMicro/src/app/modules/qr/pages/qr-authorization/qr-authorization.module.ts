import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { QrAuthorizationPageRoutingModule } from './qr-authorization-routing.module';

import { QrAuthorizationPage } from './qr-authorization.page';

import {
  QRAuthorizationModuleName,
  QrAuthorizationState
} from '@modules/qr/pages/qr-authorization/store/qr-authorization.state';
import { qrAuthorizationReducer } from '@modules/qr/pages/qr-authorization/store/qr-authorization.reducer';

import { QrAuthorizationEffect } from '@modules/qr/pages/qr-authorization/store/qr-authorzation.effect';
import { QrAuthorizationFacade } from '@modules/qr/pages/qr-authorization/qr-authorization.facade';
import { QrService } from '@modules/qr/service/qr.service';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { SecondsFormatPipe } from './pipes/seconds-format.pipe';
import { NonEnrolledModalComponent } from '@modules/qr/pages/qr-authorization/components/non-enrolled-modal/non-enrolled-modal.component';
import { CommonsModule } from '@app/commons/commons.module';

const QR_AUTHORIZATION_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<QrAuthorizationState>
>('QR Authorization Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonsModule,
    QrAuthorizationPageRoutingModule,
    HeadersModule,
    GlobalPipesModule,
    StoreModule.forFeature(
      QRAuthorizationModuleName,
      QR_AUTHORIZATION_REDUCER_TOKEN
    ),
    EffectsModule.forFeature([QrAuthorizationEffect])
  ],
  declarations: [
    QrAuthorizationPage,
    SecondsFormatPipe,
    NonEnrolledModalComponent
  ],
  providers: [
    QrAuthorizationFacade,
    QrService,
    {
      provide: QR_AUTHORIZATION_REDUCER_TOKEN,
      useValue: qrAuthorizationReducer
    }
  ]
})
export class QrAuthorizationPageModule {}
