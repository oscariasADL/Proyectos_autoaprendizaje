import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { PocketPayEffect } from '@modules/pockets/pages/pocket-pay/store/pocket-pay.effect';
import { PocketsModule } from '@modules/pockets/pockets.module';
import { GenericStepperModule } from '@modules/templates/generic-stepper/generic-stepper.module';
import { EffectsModule } from '@ngrx/effects';

import { PocketPayPageRoutingModule } from './pocket-pay-routing.module';

import { PocketPayPage } from './pocket-pay.page';
import { PocketPayDataComponent } from '@modules/pockets/pages/pocket-pay/components/pocket-pay-data/pocket-pay-data.component';
import { VoucherModule } from '@commons/components/voucher/voucher.module';
import { CommonsModule } from '@app/commons/commons.module';

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    FormsModule,
    IonicModule,
    PocketPayPageRoutingModule,
    PocketsModule,
    EffectsModule.forFeature([PocketPayEffect]),
    GenericStepperModule,
    GlobalPipesModule,
    FormsAvvModule,
    VoucherModule
  ],
  declarations: [PocketPayPage, PocketPayDataComponent]
})
export class PocketPayPageModule {}
