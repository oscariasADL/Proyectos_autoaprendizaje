import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogoutByInactivityPage } from './logout-by-inactivity.page';

const routes: Routes = [
  {
    path: '',
    component: LogoutByInactivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogoutByInactivityPageRoutingModule {}
