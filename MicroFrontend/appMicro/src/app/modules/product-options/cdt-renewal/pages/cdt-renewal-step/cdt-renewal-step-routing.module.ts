import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsGuard } from '@commons/guards/products.guard';

import { CdtRenewalStepPage } from './cdt-renewal-step.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [ProductsGuard],
    component: CdtRenewalStepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdtRenewalStepPageRoutingModule {}
