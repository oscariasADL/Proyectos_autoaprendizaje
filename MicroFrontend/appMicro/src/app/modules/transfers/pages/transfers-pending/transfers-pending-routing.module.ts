import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransfersPendingPage } from './transfers-pending.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersPendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersPendingPageRoutingModule {}
