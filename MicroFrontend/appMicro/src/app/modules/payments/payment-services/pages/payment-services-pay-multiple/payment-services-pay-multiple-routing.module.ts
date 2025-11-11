import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentServicesPayMultiplePage } from './payment-services-pay-multiple.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentServicesPayMultiplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentServicesPayMultiplePageRoutingModule {}
