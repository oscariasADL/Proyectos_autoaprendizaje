import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { PocketTransferEffect } from '@modules/pockets/pages/pocket-transfer/store/pocket-transfer.effect';
import { PocketsModule } from '@modules/pockets/pockets.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { EffectsModule } from '@ngrx/effects';

import { PocketTransferPageRoutingModule } from './pocket-transfer-routing.module';

import { PocketTransferPage } from './pocket-transfer.page';
import { PocketTransferDataComponent } from '@modules/pockets/pages/pocket-transfer/components/pocket-transfer-data/pocket-transfer-data.component';
import { VoucherModule } from '@commons/components/voucher/voucher.module';
import { CommonsModule } from '@commons/commons.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PocketTransferPageRoutingModule,
    PocketsModule,
    EffectsModule.forFeature([PocketTransferEffect]),
    GenericStepperModule,
    GlobalPipesModule,
    FormsAvvModule,
    VoucherModule,
    CommonsModule
  ],
  declarations: [PocketTransferPage, PocketTransferDataComponent]
})
export class PocketTransferPageModule {}
