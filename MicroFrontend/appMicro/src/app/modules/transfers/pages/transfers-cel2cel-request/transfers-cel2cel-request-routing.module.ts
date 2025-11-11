import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransfersCel2celRequestPage } from './transfers-cel2cel-request.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersCel2celRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersCel2celRequestPageRoutingModule {}
