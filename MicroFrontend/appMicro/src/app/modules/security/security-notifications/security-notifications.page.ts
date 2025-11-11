import { Component } from '@angular/core';
import { HOME, SECURITY_HOME } from '@commons/constants/navigate.constants';
import { NavController } from '@ionic/angular';
import {
  SecurityNotificationsStep,
  ToggleSecurityNotificationsResponse
} from '@modules/security/security-notifications/entities/security-notifications.interface';
import { SecurityNotificationsFacade } from '@modules/security/security-notifications/security-notifications.facade';
import { Observable } from 'rxjs';
import { TogglePushNotificationsType } from '@commons/entities/notifications/push-notification-register.entities';

@Component({
  selector: 'app-security-notifications',
  templateUrl: './security-notifications.page.html',
  styleUrls: ['./security-notifications.page.sass']
})
export class SecurityNotificationsPage {
  constructor(
    private navCtrl: NavController,
    private facade: SecurityNotificationsFacade
  ) {}

  public close(): void {
    this.navCtrl.navigateBack(HOME);
  }

  public backSecurity(): void {
    this.navCtrl.navigateBack(SECURITY_HOME);
  }

  public disableNotifications(): void {
    this.facade.toggleNotifications(TogglePushNotificationsType.DISABLE, true);
  }

  get securityNotificationsStep$(): Observable<SecurityNotificationsStep> {
    return this.facade.securityNotificationsStep$;
  }

  get securityNotificationsResponse$(): Observable<ToggleSecurityNotificationsResponse> {
    return this.facade.securityNotificationsResponse$;
  }

  get securityNotificationsStep(): typeof SecurityNotificationsStep {
    return SecurityNotificationsStep;
  }
}
