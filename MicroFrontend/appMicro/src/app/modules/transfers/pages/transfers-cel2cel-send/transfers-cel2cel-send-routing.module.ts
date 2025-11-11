import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransfersCel2celSendPage } from './transfers-cel2cel-send.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersCel2celSendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersCel2celSendPageRoutingModule {}
