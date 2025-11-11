import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PocketDetailPage } from './pocket-detail.page';

const routes: Routes = [
  {
    path: ':type_parent/:id_parent/:type/:number',
    component: PocketDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PocketDetailPageRoutingModule {}
