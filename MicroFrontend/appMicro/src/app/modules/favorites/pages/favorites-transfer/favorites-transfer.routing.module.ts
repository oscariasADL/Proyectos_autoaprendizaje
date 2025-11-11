import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesTransferPage } from '@modules/favorites/pages/favorites-transfer/favorites-transfer.page';

const routes: Routes = [
  {
    path: ':key_favorite',
    component: FavoritesTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesTransferPageRoutingModule {}
