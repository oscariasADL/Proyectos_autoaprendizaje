import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrAuthorizationPage } from './qr-authorization.page';
import { QrAuthorizationGuardCanActivate } from '@modules/qr/pages/qr-authorization/guards/qr-authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: QrAuthorizationPage,
    canActivate: [QrAuthorizationGuardCanActivate],
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrAuthorizationPageRoutingModule {}
