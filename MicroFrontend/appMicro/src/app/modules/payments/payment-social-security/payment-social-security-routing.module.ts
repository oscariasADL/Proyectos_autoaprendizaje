import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentSocialSecurityPage } from './payment-social-security.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentSocialSecurityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentSocialSecurityPageRoutingModule {}
