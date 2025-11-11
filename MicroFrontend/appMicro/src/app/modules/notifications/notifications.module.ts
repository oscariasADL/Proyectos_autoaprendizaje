import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { IonicModule } from '@ionic/angular';
import { NotificationsAlertComponent } from '@modules/notifications/components/notifications-alert/notifications-alert.component';
import { NotificationsMailboxComponent } from '@modules/notifications/components/notifications-mailbox/notifications-mailbox.component';
import { NotificationsMenuComponent } from '@modules/notifications/components/notifications-menu/notifications-menu.component';
import { NotificationsTransfiyaComponent } from '@modules/notifications/components/notifications-transfiya/notifications-transfiya.component';
import { NotificationsFacade } from '@modules/notifications/notifications.facade';
import { ReactiveFormsModule } from '@angular/forms';
import { MailboxDatePipe } from '@app/commons/pipes/mailbox-date.pipe';
import { NotificationsEmptyStateComponent } from './components/notifications-empty-state/notifications-empty-state.component';
import { EnableNotificationsComponent } from './components/enable-notifications/enable-notifications.component';

@NgModule({
  declarations: [
    NotificationsMenuComponent,
    NotificationsAlertComponent,
    NotificationsMailboxComponent,
    NotificationsTransfiyaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GlobalPipesModule,
    IonicModule,
    ReactiveFormsModule,
    NotificationsEmptyStateComponent,
    EnableNotificationsComponent
  ],
  exports: [NotificationsMenuComponent],
  providers: [NotificationsFacade]
})
export class NotificationsModule {}
