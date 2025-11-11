import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ProductDetailGuardCanActivate,
  ProductDetailGuardCanDeactivate
} from '@modules/product-detail/guards/product-detail.guard';

import { ProductDetailPage } from './product-detail.page';

const routes: Routes = [
  {
    path: ':type/:id',
    component: ProductDetailPage,
    canActivate: [ProductDetailGuardCanActivate],
    canDeactivate: [ProductDetailGuardCanDeactivate],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailPageRoutingModule {}
