import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PocketDetailWithReturnsPage } from './pocket-detail-with-returns.page';

const routes: Routes = [
  {
    path: ':type_parent/:id_parent/:type/:number',
    component: PocketDetailWithReturnsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PocketDetailWithReturnsPageRoutingModule {}
