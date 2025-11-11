import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransfersRemittancesPageRoutingModule } from './transfers-remittances-routing.module';

import { TransfersRemittancesPage } from './transfers-remittances.page';
import { HeadersModule } from '@app/commons/components/headers/headers.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProductModule } from '@app/modules/product/product.module';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { CommonsModule } from '@app/commons/commons.module';
import { RemittanceService } from '../../service/remittance-services.service';
import { ProductNumberMaskPipe } from '@app/commons/pipes/product-number-mask.pipe';
import { EffectsModule } from '@ngrx/effects';
import { TransfersEffect } from '../../store/transfers.effect';
import { StoreModule } from '@ngrx/store';
import { remittanceReducer } from '../../store/transfers.reducer';
import { TransfersService } from '../../service/transfers.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfersRemittancesPageRoutingModule,
    HeadersModule,
    TranslateModule,
    ProductModule,
    GlobalPipesModule,
    CommonsModule,
    EffectsModule.forFeature([TransfersEffect]),
    StoreModule.forFeature('remittance', remittanceReducer)
  ],
  declarations: [TransfersRemittancesPage],
  providers: [RemittanceService, ProductNumberMaskPipe, TransfersService]
})
export class TransfersRemittancesPageModule {}
