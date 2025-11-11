import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesAddPage } from './favorites-add.page';
import { favoritesOnboardingGuardCanActivate } from '../../guards/showOnboardingGuard.guard';

const routes: Routes = [
  {
    path: '',
    component: FavoritesAddPage,
    canActivate: [favoritesOnboardingGuardCanActivate]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesAddPageRoutingModule {}
