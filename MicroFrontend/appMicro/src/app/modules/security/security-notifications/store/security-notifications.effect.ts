import { Injectable } from '@angular/core';
import {
  SECURITY_NOTIFICATIONS_COMPLETED,
  SECURITY_NOTIFICATIONS_ERROR
} from '@modules/security/security-notifications/constants/security-notifications.constants';
import * as actions from '@modules/security/security-notifications/store/security-notifications.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as pushNotificationRegisterActions from '@store/actions/push-notification-register.actions';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class SecurityNotificationsEffect {
  constructor(private actions$: Actions) {}

  toggleSecurityNotificationsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(
        pushNotificationRegisterActions.notifyProviderPushNotificationToggleSuccessAction
      ),
      switchMap(({ action }) => {
        return of(
          actions.toggleSecurityNotificationsSuccessAction({
            response: SECURITY_NOTIFICATIONS_COMPLETED[action]
          })
        );
      })
    )
  );

  toggleSecurityNotificationsErrorEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          pushNotificationRegisterActions.notifyProviderPushNotificationToggleErrorAction,
          pushNotificationRegisterActions.togglePushNotificationsPermissionErrorAction,
          pushNotificationRegisterActions.togglePushNotificationsErrorAction
        ),
        switchMap(({ action }) => {
          return of(
            actions.toggleSecurityNotificationsSuccessAction({
              response: SECURITY_NOTIFICATIONS_ERROR[action]
            })
          );
        })
      )
  );
}
