import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransfersUnregisteredAccountsPage } from './transfers-unregistered-accounts.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersUnregisteredAccountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersUnregisteredAccountsPageRoutingModule {}
