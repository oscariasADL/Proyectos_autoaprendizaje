import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransfersRequestMoneyPage } from './transfers-request-money.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersRequestMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersRequestMoneyPageRoutingModule {}
