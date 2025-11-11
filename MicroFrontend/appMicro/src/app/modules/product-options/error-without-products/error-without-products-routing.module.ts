import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorWithoutProductsPage } from './error-without-products.page';

const routes: Routes = [
  {
    path: '',
    component: ErrorWithoutProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorWithoutProductsModuleRoutingModule {}
