import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactAddProductPage } from './contact-add-product.page';

const routes: Routes = [
  {
    path: '',
    component: ContactAddProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactAddProductPageRoutingModule {}
