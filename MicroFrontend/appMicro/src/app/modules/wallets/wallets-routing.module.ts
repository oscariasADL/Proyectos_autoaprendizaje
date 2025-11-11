import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvisioningGuard } from '@modules/wallets/guards/provisioning.guard';

const routes: Routes = [
  {
    path: 'wallet-card-list',
    loadChildren: () =>
      import('./pages/wallet-card-list/wallet-card-list.module').then(
        (m) => m.WalletCardListModule
      ),
    canActivate: [ProvisioningGuard]
  },
  {
    path: 'activate-token',
    loadChildren: () =>
      import('./pages/activate-token/activate-token.module').then(
        (m) => m.ActivateTokenPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletsRoutingModule {}
