import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { ErrorWithoutProductsModuleRoutingModule } from './error-without-products-routing.module';
import { ErrorWithoutProductsFacade } from './error-without-products.facade';
import { ErrorWithoutProductsPage } from './error-without-products.page';

@NgModule({
  declarations: [ErrorWithoutProductsPage],
  imports: [
    CommonModule,
    IonicModule,
    GlobalPipesModule,
    ErrorWithoutProductsModuleRoutingModule
  ],
  providers: [ErrorWithoutProductsFacade]
})
export class ErrorWithoutProductsModule {}
