import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QrHomePage } from './qr-home.page';

const routes: Routes = [
  {
    path: '',
    component: QrHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrHomePageRoutingModule {}
