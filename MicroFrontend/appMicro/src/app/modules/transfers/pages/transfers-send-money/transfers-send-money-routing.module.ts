import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransfersSendMoneyPage } from './transfers-send-money.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersSendMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersSendMoneyPageRoutingModule {}
