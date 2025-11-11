import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeAccount } from '@commons/entities/product/type-account';
import { ProductsGuard } from '@commons/guards/products.guard';

import { CardAdvancePage } from './card-advance.page';

const routes: Routes = [
  {
    path: '',
    data: {
      typeAccountProduct: TypeAccount.CCA
    },
    canActivate: [ProductsGuard],
    component: CardAdvancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardAdvancePageRoutingModule {}
