import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SecurityComplementaryServicesPage } from './security-complementary-services.page';

const routes: Routes = [
  {
    path: '',
    component: SecurityComplementaryServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityComplementaryServicesPageRoutingModule {}
