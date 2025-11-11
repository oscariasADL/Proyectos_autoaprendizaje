import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

import { IonicModule } from '@ionic/angular';

import { PayollAdvancePagePageRoutingModule } from './payroll-advance-routing.module';

import { PayrollAdvancePage } from './payroll-advance.page';
import { SwiperModule } from 'swiper/angular';
import { HeadersModule } from '@app/commons/components/headers/headers.module';
import { ProductDetailFacade } from '../product-detail/product-detail.facade';
import { CurrencyFormatPipe } from '@app/commons/pipes/currency-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeadersModule,
    IonicModule,
    PayollAdvancePagePageRoutingModule,
    GlobalPipesModule,
    SwiperModule
  ],
  providers: [ProductDetailFacade],
  declarations: [PayrollAdvancePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PayrollAdvancePageModule {}
