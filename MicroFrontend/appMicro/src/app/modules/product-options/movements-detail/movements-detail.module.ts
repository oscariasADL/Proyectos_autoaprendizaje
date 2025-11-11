import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MovementsDetailPage } from './movements-detail.page';
import { MovementsDetailPageRoutingModule } from './movements-detail-routing.module';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { FormsAvvModule } from '@modules/forms-avv/forms-avv.module';
import { MovementModule } from '@modules/movement/movement.module';
import { CalendarModule } from '@commons/components/calendar/calendar.module';
import { PFMModule } from '@modules/pfm/pfm.module';
import { MovementsDetailGuard } from '@modules/product-options/movements-detail/guards/movements-detail.guard';
import { CommonsModule } from '@app/commons/commons.module';

@NgModule({
  declarations: [MovementsDetailPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovementsDetailPageRoutingModule,
    HeadersModule,
    GlobalPipesModule,
    FormsAvvModule,
    MovementModule,
    CalendarModule,
    PFMModule,
    CommonsModule
  ],
  providers: [MovementsDetailGuard],
  exports: []
})
export class MovementsDetailPageModule {}
