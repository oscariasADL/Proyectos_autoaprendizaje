import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PayrollAdvancePage } from './payroll-advance.page';

const routes: Routes = [
  {
    path: '',
    component: PayrollAdvancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayollAdvancePagePageRoutingModule {}
