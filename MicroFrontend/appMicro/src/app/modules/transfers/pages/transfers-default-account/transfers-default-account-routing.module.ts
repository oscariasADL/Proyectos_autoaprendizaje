import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransfersDefaultAccountPage } from './transfers-default-account.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersDefaultAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersDefaultAccountPageRoutingModule {}
