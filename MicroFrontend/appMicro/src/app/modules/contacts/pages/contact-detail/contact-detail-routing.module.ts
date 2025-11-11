import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailResolver } from '@modules/contacts/pages/contact-detail/resolvers/contact-detail.resolver';

import { ContactDetailPage } from './contact-detail.page';

const routes: Routes = [
  {
    path: ':id/:idType',
    resolve: {
      contact: ContactDetailResolver
    },
    component: ContactDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactDetailPageRoutingModule {}
