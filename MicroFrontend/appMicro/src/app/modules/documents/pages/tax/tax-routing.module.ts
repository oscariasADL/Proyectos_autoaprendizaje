import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxPage } from './tax.page';
import { TaxSelectYearComponent } from './components/tax-select-year/tax-select-year.component';

const routes: Routes = [
  {
    path: '',
    component: TaxPage,
    children: [
      {
        path: '',
        component: TaxSelectYearComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxRoutingModule {}
