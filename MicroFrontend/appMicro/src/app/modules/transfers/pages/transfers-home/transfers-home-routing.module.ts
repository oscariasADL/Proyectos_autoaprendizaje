import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransfersHomePage } from './transfers-home.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersHomePageRoutingModule {}
