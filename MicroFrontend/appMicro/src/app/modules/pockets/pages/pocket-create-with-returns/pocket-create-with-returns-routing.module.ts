import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocketCreateWithReturnsPage } from './pocket-create-with-returns.page';
import { DontHasSDA } from '../../guards/pockets.guard';
// import { PocketsGuard } from '@modules/pockets/guards/pockets.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [DontHasSDA],
    component: PocketCreateWithReturnsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PocketCreateWithReturnsPageRoutingModule {}
