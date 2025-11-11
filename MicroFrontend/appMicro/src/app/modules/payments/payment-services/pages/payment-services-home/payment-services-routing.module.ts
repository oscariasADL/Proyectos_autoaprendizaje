import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentServicesPage } from './payment-services.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentServicesPageRoutingModule {}
