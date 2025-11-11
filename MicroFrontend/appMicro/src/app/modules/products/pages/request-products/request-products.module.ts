import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '@commons/components/headers/headers.module';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { ProductsFacade } from '../../products.facade';
import { RequestProductsPageRoutingModule } from './request-products-routing.module';
import { RequestProductsPage } from './request-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestProductsPageRoutingModule,
    GlobalPipesModule,
    HeadersModule
  ],
  declarations: [RequestProductsPage],
  providers: [ProductsFacade]
})
export class RequestProductsPageModule {}
