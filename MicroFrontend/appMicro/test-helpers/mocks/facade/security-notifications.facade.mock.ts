import { Injectable } from '@angular/core';
import {
  SecurityNotificationsStep,
  ToggleSecurityNotificationsPayload,
  ToggleSecurityNotificationsResponse
} from '@modules/security/security-notifications/entities/security-notifications.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SecurityNotificationsFacadeMock extends AppFacadeMock {
  public securityNotificationsWorking$: Observable<boolean> =
    new BehaviorSubject(false);

  public securityNotificationsCompleted$: Observable<boolean> =
    new BehaviorSubject(false);

  public securityNotificationsStep$: Observable<SecurityNotificationsStep> =
    new BehaviorSubject(null);

  public securityNotificationsResponse$: Observable<ToggleSecurityNotificationsResponse> =
    new BehaviorSubject(null);

  public setComplementaryServicesStep(step: SecurityNotificationsStep): void {}

  public toggleNotifications(
    payload: ToggleSecurityNotificationsPayload
  ): void {}
}
