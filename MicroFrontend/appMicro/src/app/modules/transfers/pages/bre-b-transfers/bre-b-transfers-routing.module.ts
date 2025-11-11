import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreBTransfersPage } from './bre-b-transfers.page';

const routes: Routes = [
  {
    path: '',
    component: BreBTransfersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreBTransfersRoutingModule {}
