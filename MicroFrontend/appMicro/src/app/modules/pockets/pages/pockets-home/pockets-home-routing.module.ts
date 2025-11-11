import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PocketsHomePage } from './pockets-home.page';

const routes: Routes = [
  {
    path: '',
    component: PocketsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PocketsHomePageRoutingModule {}
