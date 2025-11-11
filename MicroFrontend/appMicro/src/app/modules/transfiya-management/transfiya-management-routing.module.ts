import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsGuard } from '@commons/guards/products.guard';

import { TransfiyaManagementPage } from './transfiya-management.page';

const routes: Routes = [
  {
    path: ':notification_type/:notification_id',
    canActivate: [ProductsGuard],
    component: TransfiyaManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfiyaManagementPageRoutingModule {}
