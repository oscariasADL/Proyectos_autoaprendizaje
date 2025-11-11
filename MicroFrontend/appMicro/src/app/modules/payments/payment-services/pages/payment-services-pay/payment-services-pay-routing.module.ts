import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesPayGuard } from '@modules/payments/payment-services/pages/payment-services-pay/guards/services-pay.guard';

import { PaymentServicesPayPage } from './payment-services-pay.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [ServicesPayGuard],
    component: PaymentServicesPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentServicesPayPageRoutingModule {}
