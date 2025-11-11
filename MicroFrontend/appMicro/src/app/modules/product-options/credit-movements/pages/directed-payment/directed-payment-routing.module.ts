import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThereAreCreditMovementsGuard } from '@modules/product-options/credit-movements/guards/there-are-credit-movements.guard';

import { DirectedPaymentPage } from './directed-payment.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [ThereAreCreditMovementsGuard],
    data: {
      restricted: true
    },
    component: DirectedPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectedPaymentPageRoutingModule {}
