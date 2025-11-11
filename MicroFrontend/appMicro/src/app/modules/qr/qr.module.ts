import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';
import { QrService } from '@modules/qr/service/qr.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeadersModule,
    GlobalPipesModule
  ],
  exports: [HeadersModule, GlobalPipesModule],
  providers: [QrService]
})
export class QrModule {}
