import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayTaxPage } from './pay-tax.page';

const routes: Routes = [
  {
    path: '',
    component: PayTaxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayTaxPageRoutingModule {}
