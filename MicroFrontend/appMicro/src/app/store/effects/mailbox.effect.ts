import { inject, Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { PluginListenerHandle } from '@capacitor/core';
import {
  PushNotifications,
  PushNotificationSchema,
  ActionPerformed
} from '@capacitor/push-notifications';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { SecureKeys } from '@commons/constants/keys.constants';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AnalyticsService } from '@commons/services/analytics.service';
import * as actions from '../actions/mailbox.action';
import { AdlDigipassService } from '@app/commons/services/adl-digipass.service';
import { HttpErrorResponse } from '@angular/common/http';
import { getDBValue } from '@app/commons/helpers/text.helpers';
import {
  mapCustomFactsOfPushNotification,
  mapNotificationApprovalPayload,
  mapNotificationRejectPayload,
  mapPushNotificationAlert
} from '@app/modules/notifications/mappers/push-notification.mapper';
import {
  CustomFactsOfPushNotification,
  PushNotificationApprovalPayload
} from '@app/modules/notifications/entities/push-notification.interface';
import { AlertService } from '@app/commons/services/alert.service';
import * as notificationsActions from '@store/actions/notifications.action';
import { DataBasicClientDto } from '@app/commons/entities/auth/auth.entities';
import { TranslateService } from '@ngx-translate/core';
import { PushNotificationService } from '@app/modules/notifications/services/push-notification.service';
import { PushNotificationChannelEnum } from '@app/modules/notifications/constanst/notification.constants';
import { ParameterKey } from '@app/commons/entities/parameters/parameter.entities';
import { NotificationResponse } from '@app/commons/entities/notifications/notification.entities';

@Injectable()
export class MailboxEffect {
  private adlDigipass = inject(AdlDigipassService);
  private pushNotificationService = inject(PushNotificationService);
  private alertService = inject(AlertService);
  private translateService = inject(TranslateService);

  constructor(
    private actions$: Actions,
    private facade: AppFacade,
    private analytics: AnalyticsService,
    private secureStorage: AdlSecureStorageService
  ) {}

  mailboxEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.registerDeviceMailboxAction),
      switchMap((_) =>
        defer(async () => {
          let listenerOk: PluginListenerHandle;
          let listenerErr: PluginListenerHandle;

          // Request permission to use push notifications
          // iOS will prompt user and return if they granted permission or not
          let permStatus = await PushNotifications.checkPermissions();

          if (permStatus.receive === 'prompt') {
            permStatus = await PushNotifications.requestPermissions();
          }

          if (permStatus.receive !== 'granted') {
            //throw new Error('User denied permissions!');
            return actions.deactivatePushNotificationsAction();
          }

          await PushNotifications.register();

          const deviceToken = await new Promise(async (resolve, reject) => {
            listenerOk = await PushNotifications.addListener(
              'registration',
              (token) => {
                console.log('Registration token: ', token.value);
                resolve(token.value);
              }
            );
            listenerErr = await PushNotifications.addListener(
              'registrationError',
              (error) => {
                console.error('Registration error: ', error.error);
                this.analytics.sendError('Error on registration', error);
                reject(error);
              }
            );
          });

          await listenerOk.remove();
          await listenerErr.remove();

          await this.secureStorage.put(
            SecureKeys.pushNotificationsEnabled,
            'true',
            true
          );
          return actions.registerDeviceMailboxSuccessAction({ deviceToken });
        }).pipe(
          catchError((error) => {
            this.analytics.sendError(
              'Error registerDeviceMailboxAction',
              error
            );
            return of(actions.registerDeviceMailboxErrorAction());
          })
        )
      )
    )
  );

  deactivatePushNotifications$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deactivatePushNotificationsAction),
      switchMap((_) =>
        defer(async () => {
          await this.secureStorage.remove(
            SecureKeys.pushNotificationsEnabled,
            true
          );
          return actions.deactivatePushNotificationsSuccessAction();
        }).pipe(
          catchError((error) => {
            this.analytics.sendError(
              'Error deactivatePushNotificationsErrorAction',
              error
            );
            return of(actions.deactivatePushNotificationsErrorAction());
          })
        )
      )
    )
  );

  listenPushNotifications$: any = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.listenPushNotificationsAction),
        tap(() => {
          // Show us the notification payload if the app is open on our device
          PushNotifications.addListener(
            'pushNotificationReceived',
            (notification: PushNotificationSchema) =>
              this.facade.dispatch([
                actions.pushNotificationReceivedMailboxAction({ notification })
              ])
          );

          // Method called when tapping on a notification
          PushNotifications.addListener(
            'pushNotificationActionPerformed',
            (notification: ActionPerformed) =>
              this.facade.dispatch([
                actions.pushNotificationActionPerformedMailboxAction({
                  notification
                })
              ])
          );
        })
      ),
    { dispatch: false }
  );

  pushNotificationReceived$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.pushNotificationReceivedMailboxAction),
      switchMap(({ notification }) => {
        return this.notificationMapper(notification.data).pipe(
          map((response) => {
            return (
              response &&
              actions.pushNotificationDetailSuccessAction({ response })
            );
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.pushNotificationDetailErrorAction({
                message: error.message
              })
            )
          )
        );
      })
    )
  );

  pushNotificationActionPerformed$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.pushNotificationActionPerformedMailboxAction),
      switchMap(({ notification }) => {
        return this.notificationMapper(notification.notification.data).pipe(
          map((response) => {
            return (
              response &&
              actions.pushNotificationDetailSuccessAction({ response })
            );
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.pushNotificationDetailErrorAction({
                message: error.message
              })
            )
          )
        );
      })
    )
  );

  pushNotificationSavedAction$: any = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.pushNotificationSavedAction),
      switchMap(({ notification }) => {
        return this.notificationMapper(JSON.parse(notification)).pipe(
          map((response) => {
            return (
              response &&
              actions.pushNotificationDetailSuccessAction({ response })
            );
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.pushNotificationDetailErrorAction({
                message: error.message
              })
            )
          )
        );
      })
    )
  );

  pushNotificationDetailEffect$: any = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.pushNotificationDetailSuccessAction),
      switchMap(({ response }) => {
        const item = response.content[0];

        return from(
          this.pushNotificationService.decryptNotificationMessage(item.message)
        ).pipe(
          map((decryptedMessage) => {
            const notificacionData: CustomFactsOfPushNotification =
              mapCustomFactsOfPushNotification(decryptedMessage);
            return actions.showNotificationModalAction({
              props: mapPushNotificationAlert(
                notificacionData,
                this.translateService
              ),
              customFacts: notificacionData,
              encryptedNotification: item.message,
              notificationItem: item
            });
          })
        );
      })
    )
  );

  showPushNotificationModalEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.showNotificationModalAction),
      switchMap(async ({ props, customFacts, notificationItem }) => {
        const pushNotificationTTL: number = this.facade.boundsByKey(
          ParameterKey.pushNotificationTTL
        );
        setTimeout(() => {
          this.alertService.close();
        }, pushNotificationTTL);
        const confirm = await this.alertService.create(props);

        const userData: DataBasicClientDto =
          this.facade.basicData$.currentValue();
        if (confirm === true) {
          const pushNotificationApprovalPayload: PushNotificationApprovalPayload =
            await mapNotificationApprovalPayload(
              customFacts,
              userData,
              this.adlDigipass,
              notificationItem
            );
          return notificationsActions.approvePushNotification({
            payload: pushNotificationApprovalPayload
          });
        }

        if (confirm === false) {
          const pushNotificationRejectPayload =
            await mapNotificationRejectPayload(
              customFacts,
              userData,
              this.adlDigipass,
              notificationItem
            );
          return notificationsActions.rejectPushNotification({
            payload: pushNotificationRejectPayload
          });
        }
      })
    )
  );

  private notificationMapper(notification) {
    return from(this.secureStorage.getAll()).pipe(
      switchMap((db) => {
        const isUserLoggedIn = getDBValue(db, SecureKeys.token);
        if (isUserLoggedIn) {
          return this.pushNotificationService.getNotificationInfo(
            notification['#id'],
            db
          );
        } else {
          this.saveNotificationInStorage(notification);
        }
      })
    );
  }

  private async saveNotificationInStorage(notification: Notification) {
    await this.secureStorage.put(
      SecureKeys.pushNotification,
      JSON.stringify(notification),
      true
    );
  }
}
