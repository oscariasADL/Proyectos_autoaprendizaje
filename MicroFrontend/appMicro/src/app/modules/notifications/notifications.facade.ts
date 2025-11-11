import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import {
  NotificationItem,
  NotificationPayload
} from '@commons/entities/notifications/notification.entities';
import { select } from '@ngrx/store';
import * as notificationsActions from '@store/actions/notifications.action';
import {
  notificationsDeletedListSelector,
  notificationsReadListSelector
} from '@store/selectors/notifications.selector';
import { Observable } from 'rxjs';
import { CustomFactsOfPushNotification } from './entities/push-notification.interface';
import { AlertSheetProperties } from '@app/commons/entities/alert/alert-sheet.entities';

@Injectable()
export class NotificationsFacade extends AppFacade {
  public notificationsDeletedList$: Observable<string> = this.store.pipe(
    select(notificationsDeletedListSelector)
  );

  public notificationsReadList$: Observable<string> = this.store.pipe(
    select(notificationsReadListSelector)
  );

  public fetchNotificationItem(payload: NotificationPayload): void {
    this.store.dispatch(
      notificationsActions.fetchNotificationItemAction({ payload })
    );
  }

  public setReadNotificationsList(readList: string): void {
    this.store.dispatch(
      notificationsActions.setReadNotificationsListAction({
        readList
      })
    );
  }

  public setDeletedNotificationsList(deletedList: string): void {
    this.store.dispatch(
      notificationsActions.setDeletedNotificationsListAction({
        deletedList
      })
    );
  }

  public showPushNotificationModal(
    props: AlertSheetProperties,
    customFacts: CustomFactsOfPushNotification,
    notificationItem: NotificationItem
  ): void {
    this.store.dispatch(
      notificationsActions.showNotificationModalAction({
        props,
        customFacts,
        notificationItem
      })
    );
  }
}
