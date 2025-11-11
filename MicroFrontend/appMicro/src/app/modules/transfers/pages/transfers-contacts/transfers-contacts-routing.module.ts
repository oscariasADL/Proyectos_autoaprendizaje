import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransfersContactsPage } from './transfers-contacts.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersContactsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersContactsPageRoutingModule {}
