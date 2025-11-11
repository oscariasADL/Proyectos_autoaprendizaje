import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesEditPage } from '@modules/favorites/pages/favorites-edit/favorites-edit.page';

const routes: Routes = [
  {
    path: ':key_favorite',
    component: FavoritesEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesEditPageRoutingModule {}
