import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PocketsGuard } from '@modules/pockets/guards/pockets.guard';

import { PocketCreatePage } from './pocket-create.page';
import { DontHasSDA } from '../../guards/pockets.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [DontHasSDA],
    component: PocketCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PocketCreatePageRoutingModule {}
