import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockCardTemporarilyPage } from './block-card-temporarily.page';
import { BlockCardTemporarilyCanActivate } from '@modules/product-options/block-card-temporarily/guards/block-card-temporarily.guard';

const routes: Routes = [
  {
    path: ':id',
    component: BlockCardTemporarilyPage,
    canActivate: [BlockCardTemporarilyCanActivate]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockCardTemporarilyPageRoutingModule {}
