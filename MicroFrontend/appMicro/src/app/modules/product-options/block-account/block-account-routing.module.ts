import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockAccountPage } from './block-account.page';
import { BlockAccountFormComponent } from '@modules/product-options/block-account/components/block-account-form/block-account-form.component';
import { BlockAccountInfoComponent } from '@modules/product-options/block-account/components/block-account-info/block-account-info.component';
import { BlockAccountGuard } from '@modules/product-options/block-account/guards/block-account.guard';

const routes: Routes = [
  {
    path: '',
    component: BlockAccountPage,
    canActivate: [BlockAccountGuard],
    canActivateChild: [BlockAccountGuard],
    children: [
      {
        path: '',
        component: BlockAccountFormComponent
      },
      {
        path: 'info',
        component: BlockAccountInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockAccountPageRoutingModule {}
