import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentServicesCreateSchedulingPage } from './payment-services-create-scheduling.page';
import { CreateSchedulingComponent } from '@modules/payments/payment-services/pages/payment-services-create-scheduling/components/create-scheduling/create-scheduling.component';
import { CreateSchedulingConfirmComponent } from '@modules/payments/payment-services/pages/payment-services-create-scheduling/components/create-scheduling-confirm/create-scheduling-confirm.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentServicesCreateSchedulingPage,
    children: [
      {
        path: '',
        component: CreateSchedulingComponent
      },
      {
        path: 'confirm',
        component: CreateSchedulingConfirmComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentServicesCreateSchedulingPageRoutingModule {}
