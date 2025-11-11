import { Injectable } from '@angular/core';
import { AlertSheetProperties } from '@app/commons/entities/alert/alert-sheet.entities';
import { NotificationPayload } from '@app/commons/entities/notifications/notification.entities';
import { CustomFactsOfPushNotification } from '@app/modules/notifications/entities/push-notification.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Injectable()
export class NotificationFacadeMock {
  public notificationsReadList$: Observable<string> = new BehaviorSubject(null);

  public notificationsDeletedList$: Observable<string> = new BehaviorSubject(
    null
  );

  public fetchNotificationItem(payload: NotificationPayload): void {}

  public setReadNotificationsList(readList: string): void {}

  public setDeletedNotificationsList(deletedList: string): void {}

  public showPushNotificationModal(
    props: AlertSheetProperties,
    customFacts: CustomFactsOfPushNotification,
    encryptedNotification: string
  ): void {}
}
