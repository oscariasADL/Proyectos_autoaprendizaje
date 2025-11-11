import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CareChannelsPage } from './care-channels.page';

const routes: Routes = [
  {
    path: '',
    component: CareChannelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareChannelsPageRoutingModule {}
