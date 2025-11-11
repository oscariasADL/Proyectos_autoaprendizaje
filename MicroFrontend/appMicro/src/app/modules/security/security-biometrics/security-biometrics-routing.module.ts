import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityBiometricsGuard } from '@modules/security/security-biometrics/guards/security-biometrics.guard';

import { SecurityBiometricsPage } from './security-biometrics.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [SecurityBiometricsGuard],
    component: SecurityBiometricsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityBiometricsPageRoutingModule {}
