import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeAccount } from '@commons/entities/product/type-account';
import { ProductsGuard } from '@commons/guards/products.guard';
import { DebitPurchasePage } from './debit-purchase.page';

const routes: Routes = [
  {
    path: '',
    data: {
      typeAccountProducts: [TypeAccount.CCA, TypeAccount.LOC]
    },
    canActivate: [ProductsGuard],
    component: DebitPurchasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebitPurchasePageRoutingModule {}
