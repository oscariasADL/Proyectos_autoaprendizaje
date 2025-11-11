import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestProductsPage } from './request-products.page';

const routes: Routes = [
  {
    path: '',
    component: RequestProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestProductsPageRoutingModule {}
