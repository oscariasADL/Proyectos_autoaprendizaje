import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentCreditsPage } from './payment-credits.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentCreditsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentCreditsPageRoutingModule {}
