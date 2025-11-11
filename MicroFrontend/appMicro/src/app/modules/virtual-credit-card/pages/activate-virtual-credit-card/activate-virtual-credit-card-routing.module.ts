import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivateVirtualCreditCardPage } from './activate-virtual-credit-card.page';

const routes: Routes = [
  {
    path: '',
    component: ActivateVirtualCreditCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivateVirtualCreditCardPageRoutingModule {}
