import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashWithdrawalsPage } from './cash-withdrawals.page';

const routes: Routes = [
  {
    path: '',
    component: CashWithdrawalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashWithdrawalsPageRoutingModule {}
