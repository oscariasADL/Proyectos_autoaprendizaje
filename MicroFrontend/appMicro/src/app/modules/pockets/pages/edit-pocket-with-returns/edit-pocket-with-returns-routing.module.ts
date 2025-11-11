import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeAccount } from '@commons/entities/product/type-account';
import { ProductsGuard } from '@commons/guards/products.guard';

import { EditPocketWithReturnsPage } from './edit-pocket-with-returns.page';
import { PocketWithReturnsGuard } from './guards/pocket-with-returns.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      typeAccountProduct: TypeAccount.SDA
    },
    canActivate: [ProductsGuard, PocketWithReturnsGuard],
    component: EditPocketWithReturnsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPocketWithReturnsPageRoutingModule {}
