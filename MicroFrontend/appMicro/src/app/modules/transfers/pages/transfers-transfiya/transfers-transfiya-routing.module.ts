import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransfersTransfiyaPage } from './transfers-transfiya.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersTransfiyaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersTransfiyaPageRoutingModule {}
