import { Injectable } from '@angular/core';
import { AppFacadeMock } from './app.facade.mock';
import { BehaviorSubject } from 'rxjs';
import { NotificationPayload } from '@commons/entities/notifications/notification.entities';

@Injectable()
export class NotificationsFacadeMock extends AppFacadeMock {
  public notificationsReadList$: Observable<string> = new BehaviorSubject(
    'ULivvuOjGoFZlke0+zLWuUQf,ULivvuOjGoFZdlke0+zLWuUQf,0052872783340303'
  );

  public notificationsDeletedList$: Observable<string> = new BehaviorSubject(
    'ULivvuOjGoFZlke0+zLWuUQf,005287278340303as,00525900h45323493397'
  );

  public fetchNotificationItem(payload: NotificationPayload): void {}

  public setReadNotificationsList(readList: string): void {}

  public setDeletedNotificationsList(deletedList: string): void {}
}
