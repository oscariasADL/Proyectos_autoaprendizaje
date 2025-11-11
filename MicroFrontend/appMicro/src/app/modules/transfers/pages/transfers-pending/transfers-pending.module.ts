import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { TransfersModule } from '@modules/transfers/transfers.module';

import { TransfersPendingPageRoutingModule } from './transfers-pending-routing.module';

import { TransfersPendingPage } from './transfers-pending.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersPendingPageRoutingModule,
    HeadersModule,
    GlobalPipesModule,
    TransfersModule
  ],
  declarations: [TransfersPendingPage]
})
export class TransfersPendingPageModule {}
