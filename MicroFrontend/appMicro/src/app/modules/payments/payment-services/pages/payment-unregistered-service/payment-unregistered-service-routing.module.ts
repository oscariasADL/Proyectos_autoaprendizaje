import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentUnregisteredServicePage } from './payment-unregistered-service.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentUnregisteredServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentUnregisteredServicePageRoutingModule {}
