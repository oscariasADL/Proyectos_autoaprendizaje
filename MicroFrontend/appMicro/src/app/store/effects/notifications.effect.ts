import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { QR_AUTHORIZATION } from '@app/commons/constants/navigate.constants';
import { DeviceData } from '@app/commons/entities/device/device.interface';
import { AlertService } from '@app/commons/services/alert.service';
import { PushNotificationChannelEnum } from '@app/modules/notifications/constanst/notification.constants';
import { mapPushNotificationApprovedError } from '@app/modules/notifications/mappers/push-notification.mapper';
import { SecureKeys } from '@commons/constants/keys.constants';
import { NotificationResponse } from '@commons/entities/notifications/notification.entities';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { getDBValue } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { NotificationsService } from '@commons/services/notifications.service';
import { MenuController, NavController } from '@ionic/angular';
import { fetchProductsAction } from '@modules/product/store/product.actions';
import {
  mapTransfiyaManagementError,
  mapTransfiyaManagementResponse
} from '@modules/transfiya-management/mappers/transfiya-management-response.mapper';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as notificationsActions from '@store/actions/notifications.action';
import * as actions from '@store/actions/notifications.action';
import { defer, firstValueFrom, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class NotificationsEffect {
  constructor(
    private actions$: Actions,
    private facade: AppFacade,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private service: NotificationsService,
    private secureStorage: AdlSecureStorageService,
    private alertService: AlertService
  ) {}

  fetchTransfiyaAuthorizationsIfNecessaryEffect$: Observable<any> =
    createEffect(
      () =>
        this.actions$.pipe(
          ofType(actions.fetchTransfiyaAuthorizationsIfNecessaryAction),
          switchMap((action) =>
            defer(async () => {
              const transfiyaLoaded =
                this.facade.transfiyaLoaded$.currentValue();

              if (!transfiyaLoaded) {
                this.facade.dispatch([
                  actions.fetchTransfiyaAuthorizationsAction()
                ]);
              }
            })
          )
        ),
      { dispatch: false }
    );

  fetchTransfiyaAuthorizationsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchTransfiyaAuthorizationsAction),
      mergeMap(() => [
        actions.fetchTransfiyaRequestsAction(),
        actions.fetchTransfiyaConsignmentsAction()
      ])
    )
  );

  fetchTransfiyaEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchTransfiyaConsignmentsAction),
      switchMap(() =>
        this.service.fetchTransfiyaConsignmentsList().pipe(
          map((items) =>
            actions.fetchTransfiyaConsignmentsSuccessAction({ items })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchTransfiyaErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  fetchTransfiyaRequestsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchTransfiyaRequestsAction),
      switchMap(() =>
        this.service.fetchTransfiyaRequestsList().pipe(
          map((items) =>
            actions.fetchTransfiyaRequestsSuccessAction({ items })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchTransfiyaErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  acceptTransfiyaAuthorizationEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.acceptTransfiyaAuthorizationAction),
      switchMap(({ payload, data, isRequest }) =>
        this.service.acceptTransfiyaAuthorization(payload, isRequest).pipe(
          mergeMap((response: GenericResponse) => [
            fetchProductsAction(),
            actions.removeByIdTransfiyaAuthorizationAction({
              transactionId: payload.extraFields.transactionId
            }),
            actions.acceptTransfiyaAuthorizationSuccessAction({
              props: mapTransfiyaManagementResponse(response, data.voucher)
            })
          ]),
          tap(() => this.navCtrl.pop()),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.acceptTransfiyaAuthorizationErrorAction({
                props: mapTransfiyaManagementError(error)
              })
            )
          )
        )
      )
    )
  );

  rejectTransfiyaAuthorizationEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.rejectTransfiyaAuthorizationAction),
      switchMap(({ payload, isRequest, data }) =>
        this.service.rejectTransfiyaAuthorization(payload, isRequest).pipe(
          mergeMap(() => [
            actions.removeByIdTransfiyaAuthorizationAction({
              transactionId: payload.extraFields.transactionId
            }),
            actions.rejectTransfiyaAuthorizationSuccessAction({
              props: {
                type: ToastType.success,
                title: '¡Rechazo de transacción realizado!'
              }
            })
          ]),
          tap(() => {
            this.menuCtrl.open('notifications');
            this.navCtrl.pop();
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.rejectTransfiyaAuthorizationErrorAction({
                props: {
                  ...mapTransfiyaManagementError(error),
                  title: 'No fue posible rechazar la transacción'
                }
              })
            )
          )
        )
      )
    )
  );

  fetchNotificationsIfNecessaryEffect$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.fetchNotificationsIfNecessaryAction),
        switchMap((action) =>
          defer(async () => {
            const notificationsLoaded =
              this.facade.notificationsLoaded$.currentValue();

            if (!notificationsLoaded) {
              this.facade.dispatch([actions.fetchNotificationsAction()]);
            }
          })
        )
      ),
    { dispatch: false }
  );

  fetchNotificationsEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchNotificationsAction),
      switchMap((action) =>
        defer(async () => {
          const db = await this.secureStorage.getAll();

          const { uuid: deviceId } = (await firstValueFrom(
            this.facade.deviceInfo$
          )) as DeviceData;
          const { typeDocument: documentType, document: documentNumber } =
            JSON.parse(getDBValue(db, SecureKeys.loginData));

          const response: NotificationResponse = await this.service
            .fetchNotifications({
              deviceId,
              documentType,
              documentNumber
            })
            .toPromise();

          const readList = getDBValue(db, SecureKeys.readNotificationsList);
          const deletedList = getDBValue(
            db,
            SecureKeys.deletedNotificationsList
          );

          return [
            notificationsActions.setReadNotificationsListAction({
              readList: readList || ''
            }),
            notificationsActions.setDeletedNotificationsListAction({
              deletedList: deletedList || ''
            }),
            actions.fetchNotificationsSuccessAction({ response })
          ];
        }).pipe(
          mergeMap((initActions) => [...initActions]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchNotificationsErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  fetchNotificationItemEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchNotificationItemAction),
      switchMap((action) =>
        this.service.fetchNotifications(action.payload).pipe(
          map((response) =>
            actions.fetchNotificationItemSuccessAction({ response })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.fetchNotificationItemErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  rejectPushNotificationEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.rejectPushNotification),
      switchMap((action) =>
        this.service.rejectPushNotification(action.payload).pipe(
          mergeMap((response) => [
            actions.rejectPushNotificationSuccessAction({
              message: response.description
            }),
            actions.fetchNotificationsAction()
          ]),
          catchError((error: HttpErrorResponse) =>
            of(
              actions.rejectPushNotificationErrorAction({
                message: error.message.toString()
              })
            )
          )
        )
      )
    )
  );

  approvePushNotificationEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.approvePushNotification),
      switchMap((action) =>
        this.service.approvePushNotification(action.payload).pipe(
          mergeMap((response) => [
            actions.approvePushNotificationSuccessAction({
              message: response.description
            }),
            actions.fetchNotificationsAction()
          ]),
          catchError((error: HttpErrorResponse) => {
            return of(
              actions.approvePushNotificationErrorAction({
                props: mapPushNotificationApprovedError(action.payload),
                channel: action.payload.enhancedParam.channel
              })
            );
          })
        )
      )
    )
  );

  approvePushNotificationErrorEffect$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.approvePushNotificationErrorAction),
        switchMap(({ props, channel }) =>
          defer(async () => {
            const confirm = await this.alertService.create(props);
            if (confirm === true) {
              channel === PushNotificationChannelEnum.MOBILE
                ? this.goToNotifications()
                : this.goToQR();
            }
          })
        )
      ),
    { dispatch: false }
  );

  private async goToNotifications() {
    this.facade.fetchNotificationsIfNecessary();
    this.facade.fetchTransfiyaAuthorizationsIfNecessary();
    await this.menuCtrl.open('notifications');
  }

  private goToQR(): void {
    this.navCtrl.navigateForward(QR_AUTHORIZATION);
  }
}
