import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThereAreCreditMovementsGuard } from '@modules/product-options/credit-movements/guards/there-are-credit-movements.guard';

import { UpdateInstallmentsPage } from './update-installments.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [ThereAreCreditMovementsGuard],
    component: UpdateInstallmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateInstallmentsPageRoutingModule {}
