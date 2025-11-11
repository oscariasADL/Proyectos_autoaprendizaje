import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { securityNotificationsCanActivateGuard } from '@modules/security/security-notifications/guards/security-notifications.guard';

import { SecurityNotificationsPage } from './security-notifications.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [securityNotificationsCanActivateGuard],
    component: SecurityNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityNotificationsPageRoutingModule {}
