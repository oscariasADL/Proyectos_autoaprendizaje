import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeAccount } from '@commons/entities/product/type-account';
import { ProductsGuard } from '@commons/guards/products.guard';
import { PocketGuardCanActivate } from '@modules/pockets/guards/pockets.guard';

import { PocketPayPage } from './pocket-pay.page';

const routes: Routes = [
  {
    path: ':pocket_type',
    data: {
      typeAccountProduct: TypeAccount.SDA
    },
    canActivate: [ProductsGuard, PocketGuardCanActivate],
    component: PocketPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PocketPayPageRoutingModule {}
