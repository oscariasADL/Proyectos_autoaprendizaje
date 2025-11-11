import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeAccount } from '@commons/entities/product/type-account';
import { ProductsGuard } from '@commons/guards/products.guard';
import { PocketGuardCanActivate } from '@modules/pockets/guards/pockets.guard';

import { PocketEditPage } from '@modules/pockets/pages/pocket-edit/pocket-edit.page';

const routes: Routes = [
  {
    path: '',
    data: {
      typeAccountProduct: TypeAccount.SDA
    },
    canActivate: [ProductsGuard, PocketGuardCanActivate],
    component: PocketEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PocketEditPageRoutingModule {}
