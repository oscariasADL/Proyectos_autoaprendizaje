import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MfFallbackPage } from './mf-fallback.page';

const routes: Routes = [
  {
    path: '',
    component: MfFallbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MfFallbackPageRoutingModule {}
