import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransfersAvalKeyPage } from './transfers-aval-key.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersAvalKeyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersAvalKeyPageRoutingModule {}
