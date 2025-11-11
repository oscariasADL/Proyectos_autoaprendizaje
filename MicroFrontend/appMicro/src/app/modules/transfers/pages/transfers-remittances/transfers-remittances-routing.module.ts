import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransfersRemittancesPage } from './transfers-remittances.page';
import { RemittancesCanActivateGuard } from './guards/transfers-remittances.guard';

const routes: Routes = [
  {
    canActivate: [RemittancesCanActivateGuard],
    path: '',
    component: TransfersRemittancesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersRemittancesPageRoutingModule {}
