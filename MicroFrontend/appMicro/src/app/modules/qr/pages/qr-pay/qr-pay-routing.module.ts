import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrPayGuardCanActivate } from '@modules/qr/pages/qr-pay/guards/qr-pay.guard';

import { QrPayPage } from './qr-pay.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [QrPayGuardCanActivate],
    component: QrPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrPayPageRoutingModule {}
