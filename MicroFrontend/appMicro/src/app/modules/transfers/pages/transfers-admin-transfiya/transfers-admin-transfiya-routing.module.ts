import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransfersAdminTransfiyaPage } from './transfers-admin-transfiya.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersAdminTransfiyaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersAdminTransfiyaPageRoutingModule {}
