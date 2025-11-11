import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExtractsPage } from './extracts.page';
import { ExtractsSelectProductComponent } from '@modules/documents/pages/extracts/components/extracts-select-product/extracts-select-product.component';
import { ExtractsSelectSubproductComponent } from '@modules/documents/pages/extracts/components/extracts-select-subproduct/extracts-select-subproduct.component';
import { ExtractsSelectedProductComponent } from '@modules/documents/pages/extracts/components/extracts-selected-product/extracts-selected-product.component';

const routes: Routes = [
  {
    path: '',
    component: ExtractsPage,
    children: [
      {
        path: '',
        component: ExtractsSelectProductComponent
      },
      {
        path: 'select-product/:typeProduct',
        component: ExtractsSelectSubproductComponent
      },
      {
        path: 'selected-product/:type/:id',
        component: ExtractsSelectedProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtractsPageRoutingModule {}
