import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  catchError,
  from,
  map,
  Observable,
  of,
  switchMap,
  mergeMap,
  withLatestFrom
} from 'rxjs';

import * as actions from '../actions/push-notification-register.actions';
import { PushNotificationRegisterService } from '@commons/services/push-notification-register-service/push-notification-register.service';
import {
  checkPushNotificationsPermissions$,
  generateFirebaseDeviceToken$,
  registerPushNotifications$
} from '@commons/helpers/push-notification-register.helper';
import { TogglePushNotificationsType } from '@commons/entities/notifications/push-notification-register.entities';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { SecureKeys } from '@commons/constants/keys.constants';
import { AppFacade } from '@app/app.facade';
import { ParameterKey } from '@app/commons/entities/parameters/parameter.entities';

@Injectable()
export class PushNotificationRegisterEffect {
  constructor(
    private actions$: Actions,
    private secureStorage: AdlSecureStorageService,
    private pushNotificationRegisterService: PushNotificationRegisterService,
    private facade: AppFacade
  ) {}

  togglePushNotificationsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.togglePushNotificationsAction),
      withLatestFrom(this.facade.deviceInfo$),
      switchMap(([{ action, updateProvider }, deviceInfo]) => {
        const {
          osVersion,
          model: type,
          uuid: serial,
          platform: brand,
          manufacturer: spName,
          operatingSystem: osDevice
        } = deviceInfo;
        if (action === TogglePushNotificationsType.DISABLE) {
          return from(PushNotifications.unregister()).pipe(
            mergeMap(() => [
              actions.notifyProviderPushNotificationToggleAction({
                payload: {
                  action: TogglePushNotificationsType.DISABLE,
                  token: null,
                  type,
                  brand,
                  serial,
                  osDevice,
                  osVersion,
                  spName
                }
              })
            ]),
            catchError((error) => {
              return of(
                actions.togglePushNotificationsErrorAction({
                  error,
                  action
                })
              );
            })
          );
        }

        return checkPushNotificationsPermissions$().pipe(
          switchMap((permStatus) => {
            if (permStatus.receive != 'granted') {
              this.updateInternalPushNotificationsFlag(false);
              return of(
                actions.togglePushNotificationsPermissionErrorAction({
                  error: permStatus.receive,
                  action
                })
              );
            }
            const tokenRequestTimeout: number = this.facade.boundsByKey(
              ParameterKey.tokenRequestTimeout
            );
            return registerPushNotifications$().pipe(
              switchMap(() =>
                generateFirebaseDeviceToken$(tokenRequestTimeout)
              ),
              mergeMap((deviceToken) => {
                const actionsMap: Action[] = [
                  actions.togglePushNotificationsSuccessAction({
                    status: true,
                    action,
                    deviceToken
                  })
                ];

                if (updateProvider) {
                  actionsMap.push(
                    actions.notifyProviderPushNotificationToggleAction({
                      payload: {
                        action,
                        token: deviceToken,
                        type,
                        brand,
                        serial,
                        osDevice,
                        osVersion,
                        spName
                      }
                    })
                  );
                }

                this.updateInternalPushNotificationsFlag(true);

                return actionsMap;
              })
            );
          }),
          catchError((error) => {
            return of(
              actions.togglePushNotificationsErrorAction({ error, action })
            );
          })
        );
      })
    )
  );

  notifyProviderPushNotificationToggleEffect$: Observable<Action> =
    createEffect(() =>
      this.actions$.pipe(
        ofType(actions.notifyProviderPushNotificationToggleAction),
        switchMap(({ payload }) => {
          return this.pushNotificationRegisterService
            .togglePushNotifications(payload)
            .pipe(
              map(() => {
                const status: boolean =
                  payload.action === TogglePushNotificationsType.ENABLE;
                this.updateInternalPushNotificationsFlag(status);
                return actions.notifyProviderPushNotificationToggleSuccessAction(
                  { action: payload.action, status }
                );
              }),
              catchError((error) => {
                this.updateInternalPushNotificationsFlag(false);
                return of(
                  actions.notifyProviderPushNotificationToggleErrorAction({
                    error,
                    action: payload.action,
                    status: false
                  })
                );
              })
            );
        })
      )
    );

  private updateInternalPushNotificationsFlag(value: boolean): void {
    void this.secureStorage.put(
      SecureKeys.pushNotificationsEnabled,
      value.toString(),
      true
    );
  }
}
