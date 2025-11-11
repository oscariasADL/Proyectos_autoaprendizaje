import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransfersAvvAccountPage } from './transfers-avv-account.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersAvvAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersAvvAccountPageRoutingModule {}
