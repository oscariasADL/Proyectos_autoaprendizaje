import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoneyOrdersPage } from './money-orders.page';

const routes: Routes = [
  {
    path: '',
    component: MoneyOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyOrdersPageRoutingModule {}
