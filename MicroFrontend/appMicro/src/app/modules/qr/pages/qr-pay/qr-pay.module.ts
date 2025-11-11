import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { ProductModule } from '@modules/product/product.module';
import { QrPayDataComponent } from '@modules/qr/pages/qr-pay/components/qr-pay-data/qr-pay-data.component';
import { QrPayInstallmentsComponent } from '@modules/qr/pages/qr-pay/components/qr-pay-installments/qr-pay-installments.component';
import { QrPayProductsComponent } from '@modules/qr/pages/qr-pay/components/qr-pay-products/qr-pay-products.component';
import { QrPayFacade } from '@modules/qr/pages/qr-pay/qr-pay.facade';
import { QrPayService } from '@modules/qr/pages/qr-pay/service/qr-pay.service';
import { QrPayEffect } from '@modules/qr/pages/qr-pay/store/qr-pay.effect';
import { qrPayReducer } from '@modules/qr/pages/qr-pay/store/qr-pay.reducer';
import {
  qrPayFeatureName,
  QrPayState
} from '@modules/qr/pages/qr-pay/store/qr-pay.state';
import { QrModule } from '@modules/qr/qr.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { QrPayPageRoutingModule } from './qr-pay-routing.module';
import { QrPayPage } from './qr-pay.page';
import { DropdownModalProductsComponent } from '@modules/forms-avv/components/dropdown-modal-products/dropdown-modal-products.component';
import { TransfersService } from '@modules/transfers/service/transfers.service';

export const QR_PAY_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<QrPayState>
>('QR Pay Module State');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrPayPageRoutingModule,
    QrModule,
    StoreModule.forFeature(qrPayFeatureName, QR_PAY_REDUCER_TOKEN),
    EffectsModule.forFeature([QrPayEffect]),
    GenericStepperModule,
    ProductModule,
    FormsAvvModule,
    ReactiveFormsModule,
    DropdownModalProductsComponent
  ],
  declarations: [
    QrPayPage,
    QrPayDataComponent,
    QrPayProductsComponent,
    QrPayInstallmentsComponent
  ],
  providers: [
    QrPayFacade,
    QrPayService,
    TransfersService,
    {
      provide: QR_PAY_REDUCER_TOKEN,
      useValue: qrPayReducer
    }
  ]
})
export class QrPayPageModule {}
