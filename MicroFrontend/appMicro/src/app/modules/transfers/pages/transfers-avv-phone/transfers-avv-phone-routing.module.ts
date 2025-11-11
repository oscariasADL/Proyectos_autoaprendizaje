import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransfersAvvPhonePage } from './transfers-avv-phone.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersAvvPhonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersAvvPhonePageRoutingModule {}
