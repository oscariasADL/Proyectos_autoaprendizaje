import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UseQuotaPage } from './use-quota.page';
import { TypeAccount } from '@commons/entities/product/type-account';
import { ProductsGuard } from '@commons/guards/products.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      typeAccountProduct: TypeAccount.LOC
    },
    canActivate: [ProductsGuard],
    component: UseQuotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UseQuotaPageRoutingModule {}
