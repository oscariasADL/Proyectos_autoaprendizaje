import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransfersTrustRelationPage } from './transfers-trust-relation.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersTrustRelationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersTrustRelationPageRoutingModule {}
