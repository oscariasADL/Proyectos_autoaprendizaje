import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransfersCel2celHomePage } from './transfers-cel2cel-home.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersCel2celHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersCel2celHomePageRoutingModule {}
