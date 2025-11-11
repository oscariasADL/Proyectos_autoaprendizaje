import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivateDigitalDebitCardPage } from './activate-digital-debit-card.page';

const routes: Routes = [
  {
    path: '',
    component: ActivateDigitalDebitCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivateDigitalDebitCardPageRoutingModule {}
