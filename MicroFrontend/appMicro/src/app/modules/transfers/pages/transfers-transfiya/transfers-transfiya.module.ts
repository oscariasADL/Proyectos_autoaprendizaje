import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { TransfersModule } from '@modules/transfers/transfers.module';

import { TransfersTransfiyaPageRoutingModule } from './transfers-transfiya-routing.module';

import { TransfersTransfiyaPage } from './transfers-transfiya.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersTransfiyaPageRoutingModule,
    TransfersModule,
    HeadersModule,
    GlobalPipesModule
  ],
  declarations: [TransfersTransfiyaPage]
})
export class TransfersTransfiyaPageModule {}
