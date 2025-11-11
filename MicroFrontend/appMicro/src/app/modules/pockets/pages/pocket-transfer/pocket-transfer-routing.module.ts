import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocketGuardCanActivate } from '@modules/pockets/guards/pockets.guard';

import { PocketTransferPage } from './pocket-transfer.page';

const routes: Routes = [
  {
    path: ':pocket_type',
    canActivate: [PocketGuardCanActivate],
    component: PocketTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PocketTransferPageRoutingModule {}
