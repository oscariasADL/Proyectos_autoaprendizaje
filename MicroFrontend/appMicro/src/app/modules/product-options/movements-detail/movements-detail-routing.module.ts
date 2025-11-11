import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovementsDetailGuard } from '@modules/product-options/movements-detail/guards/movements-detail.guard';

import { MovementsDetailPage } from './movements-detail.page';

const routes: Routes = [
  {
    path: ':type/:id',
    canActivate: [MovementsDetailGuard],
    component: MovementsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementsDetailPageRoutingModule {}
