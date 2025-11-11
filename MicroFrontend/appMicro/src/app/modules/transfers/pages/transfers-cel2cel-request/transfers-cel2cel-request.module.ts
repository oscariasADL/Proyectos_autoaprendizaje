import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransfersCel2celRequestPageRoutingModule } from './transfers-cel2cel-request-routing.module';

import { TransfersCel2celRequestPage } from './transfers-cel2cel-request.page';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { TransfersModule } from '@modules/transfers/transfers.module';
import { ProductModule } from '@modules/product/product.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { TransfersCel2celRequestTowardComponent } from '@modules/transfers/pages/transfers-cel2cel-request/components/transfers-cel2cel-request-toward/transfers-cel2cel-request-toward.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersCel2celRequestPageRoutingModule,
    TransfersModule,
    FormsAvvModule,
    ProductModule,
    GlobalPipesModule,
    GenericStepperModule,
    ReactiveFormsModule
  ],
  declarations: [
    TransfersCel2celRequestPage,
    TransfersCel2celRequestTowardComponent
  ]
})
export class TransfersCel2celRequestPageModule {}
