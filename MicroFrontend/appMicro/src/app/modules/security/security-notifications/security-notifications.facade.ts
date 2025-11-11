import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import {
  SecurityNotificationsStep,
  ToggleSecurityNotificationsResponse
} from '@modules/security/security-notifications/entities/security-notifications.interface';
import { setSecurityNotificationsStepAction } from '@modules/security/security-notifications/store/security-notifications.actions';
import {
  securityNotificationsResponseSelector,
  securityNotificationsStepSelector,
  securityNotificationsWorkingSelector
} from '@modules/security/security-notifications/store/security-notifications.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { togglePushNotificationsAction } from '@store/actions/push-notification-register.actions';
import { TogglePushNotificationsType } from '@commons/entities/notifications/push-notification-register.entities';
import { pushNotificationCompletedSelector } from '@store/selectors/push-notification-register.selector';

@Injectable()
export class SecurityNotificationsFacade extends AppFacade {
  public securityNotificationsWorking$: Observable<boolean> = this.store.pipe(
    select(securityNotificationsWorkingSelector)
  );

  public securityNotificationsCompleted$: Observable<boolean> = this.store.pipe(
    select(pushNotificationCompletedSelector)
  );

  public securityNotificationsStep$: Observable<SecurityNotificationsStep> =
    this.store.pipe(select(securityNotificationsStepSelector));

  public securityNotificationsResponse$: Observable<ToggleSecurityNotificationsResponse> =
    this.store.pipe(select(securityNotificationsResponseSelector));

  public setSecurityNotificationsStep(step: SecurityNotificationsStep): void {
    this.store.dispatch(setSecurityNotificationsStepAction({ step }));
  }

  public toggleNotifications(
    action: TogglePushNotificationsType,
    updateProvider: boolean
  ): void {
    this.store.dispatch(
      togglePushNotificationsAction({ action, updateProvider })
    );
  }
}
