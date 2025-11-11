import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesHomePage } from '@modules/favorites/pages/favorites-home/favorites-home.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritesHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesHomePageRoutingModule {}
