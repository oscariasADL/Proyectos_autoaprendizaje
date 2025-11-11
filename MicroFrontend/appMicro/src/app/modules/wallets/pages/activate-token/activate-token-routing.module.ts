import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivateTokenPage } from './activate-token.page';

const routes: Routes = [
  {
    path: '',
    component: ActivateTokenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivateTokenPageRoutingModule {}
