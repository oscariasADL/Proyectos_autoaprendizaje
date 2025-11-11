import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactListPage } from './contact-list.page';

const routes: Routes = [
  {
    path: '',
    component: ContactListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactListPageRoutingModule {}
