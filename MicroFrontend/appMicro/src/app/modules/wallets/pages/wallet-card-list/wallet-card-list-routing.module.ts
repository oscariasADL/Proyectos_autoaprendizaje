import { NgModule } from '@angular/core';
import { WalletCardListPage } from '@modules/wallets/pages/wallet-card-list/wallet-card-list.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WalletCardListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletCardListRoutingModule {}
