import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentCreditsPayPage } from './payment-credits-pay.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentCreditsPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentCreditsPayPageRoutingModule {}
