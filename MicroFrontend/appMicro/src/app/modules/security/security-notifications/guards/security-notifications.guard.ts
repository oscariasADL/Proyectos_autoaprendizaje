import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router'; // Importa Router si necesitas navegar programáticamente
import { NavController } from '@ionic/angular'; // Si NavController se usa fuera del guard, manténlo. Si solo para navegación interna, Router es más común en Angular.
import {
  SECURITY_NOTIFICATIONS_COMPLETED,
  SECURITY_NOTIFICATIONS_ERROR
} from '@modules/security/security-notifications/constants/security-notifications.constants';
import { SecurityNotificationsStep } from '@modules/security/security-notifications/entities/security-notifications.interface';
import { SecurityNotificationsFacade } from '@modules/security/security-notifications/security-notifications.facade';
import * as actions from '@modules/security/security-notifications/store/security-notifications.actions';
import { Actions, ofType } from '@ngrx/effects';
import * as pushNotificationsRegisterActions from '@store/actions/push-notification-register.actions';
import { merge, Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { TogglePushNotificationsType } from '@commons/entities/notifications/push-notification-register.entities';

export const securityNotificationsCanActivateGuard: CanActivateFn = (
  route,
  state
): Observable<boolean> => {
  const actions$ = inject(Actions);
  const facade = inject(SecurityNotificationsFacade);

  return new Observable<boolean>((subscriber) => {
    facade.enableLoading();

    const sub = merge(
      actions$.pipe(
        ofType(
          pushNotificationsRegisterActions.notifyProviderPushNotificationToggleSuccessAction
        ),
        tap(() => {
          facade.dispatch([
            actions.toggleSecurityNotificationsSuccessAction({
              response:
                SECURITY_NOTIFICATIONS_COMPLETED[
                  TogglePushNotificationsType.ENABLE
                ]
            })
          ]);
        }),
        switchMap(() =>
          facade.securityNotificationsCompleted$.pipe(
            filter(Boolean),
            take(1),
            tap(() => subscriber.next(true))
          )
        )
      ),
      actions$.pipe(
        ofType(
          pushNotificationsRegisterActions.togglePushNotificationsPermissionErrorAction,
          pushNotificationsRegisterActions.togglePushNotificationsErrorAction,
          pushNotificationsRegisterActions.notifyProviderPushNotificationToggleErrorAction
        ),
        tap(() => {
          facade.dispatch([
            actions.toggleSecurityNotificationsErrorAction({
              response:
                SECURITY_NOTIFICATIONS_ERROR[TogglePushNotificationsType.ENABLE]
            })
          ]);
          subscriber.next(true); // incluso en error, permitimos navegación o lógica continua
        })
      )
    ).subscribe();

    facade.pushNotificationsState$
      .pipe(take(1))
      .subscribe((activeNotifications) => {
        if (!activeNotifications) {
          facade.dispatch([
            pushNotificationsRegisterActions.togglePushNotificationsAction({
              action: TogglePushNotificationsType.ENABLE,
              updateProvider: true
            })
          ]);
        } else {
          facade.setSecurityNotificationsStep(
            SecurityNotificationsStep.confirm
          );
          subscriber.next(true);
        }
      });

    return () => {
      sub.unsubscribe();
      facade.disableLoading();
    };
  });
};
