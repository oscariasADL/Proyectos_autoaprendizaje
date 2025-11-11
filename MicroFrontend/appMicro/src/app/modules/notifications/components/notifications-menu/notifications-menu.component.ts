import { Component, ViewChild } from '@angular/core';
import { DeviceData } from '@app/commons/entities/device/device.interface';
import { SecureKeys } from '@commons/constants/keys.constants';
import {
  NOTIFICATIONS,
  TRANSFIYA_MANAGEMENT
} from '@commons/constants/navigate.constants';
import { AlertSheetType } from '@commons/entities/alert/alert-sheet.entities';
import { NotificationItem } from '@commons/entities/notifications/notification.entities';
import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';
import { ToastType } from '@commons/entities/toast/toast.entities';
import { getDBValue } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AlertService } from '@commons/services/alert.service';
import { IonRefresher, MenuController, NavController } from '@ionic/angular';
import { NotificationsFacade } from '@modules/notifications/notifications.facade';
import { firstValueFrom, merge, Observable, of } from 'rxjs';
import { filter, map, scan, take } from 'rxjs/operators';
import { NotificationMailboxEnum } from '../../constanst/notification.constants';

@Component({
  selector: 'app-notifications-menu',
  templateUrl: './notifications-menu.component.html',
  styleUrls: ['./notifications-menu.component.sass']
})
export class NotificationsMenuComponent {
  @ViewChild(IonRefresher, { static: false })
  ionRefresher: IonRefresher;
  public showItemSelection: boolean = false;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private facade: NotificationsFacade,
    private secureStorage: AdlSecureStorageService,
    private alertService: AlertService
  ) {}

  public doRefresh(): void {
    if (this.facade.isLogged$.currentValue()) {
      this.facade.getTransfiyaAuthorizations();
    }
    this.facade.fetchNotifications();

    this.workingNotifications$
      .pipe(
        filter((isLoading) => !isLoading),
        take(1)
      )
      .subscribe(() => this.ionRefresher.complete());
  }

  public goToTransfiyaAuthorization(item: TransfiyaAuthorizationItem): void {
    this.closeMenu();
    this.navCtrl.navigateForward([
      ...TRANSFIYA_MANAGEMENT,
      item.isRequest ? 'dispatch' : 'consignment',
      item.transactionId
    ]);
  }

  public redirectNotifications(): void {
    this.closeMenu();
    this.navCtrl.navigateForward(NOTIFICATIONS);
  }

  public closeMenu(): void {
    this.menuCtrl.close();
    this.changeShowItemSelection(false);
  }

  public changeShowItemSelection(showItemSelection: boolean): void {
    this.showItemSelection = showItemSelection;
  }

  public async readNotificationsItem(item: NotificationItem): Promise<void> {
    await this.setNewNotificationReadList([item]);
  }

  public async readSelectedNotificationItems(
    items: NotificationItem[]
  ): Promise<void> {
    await this.setNewNotificationReadList(items);
    this.facade.showToast({
      type: ToastType.success,
      title: 'NOTIFICATION.MENU.MAILBOX.SUCCESS.READ_ALL'
    });
  }

  public async deleteNotificationsItem(item: NotificationItem): Promise<void> {
    await this.setNewNotificationsDeletedList(
      [item],
      'NOTIFICATION.MENU.MAILBOX.SUCCESS.DELETE_ITEM'
    );
  }

  public async deleteSelectedNotificationItems(
    items: NotificationItem[]
  ): Promise<void> {
    await this.setNewNotificationsDeletedList(
      items,
      'NOTIFICATION.MENU.MAILBOX.SUCCESS.DELETE_ALL'
    );
  }

  public async fetchNotificationItem({ id }: NotificationItem): Promise<void> {
    const { uuid: deviceId } = (await firstValueFrom(
      this.facade.deviceInfo$
    )) as DeviceData;

    const db = await this.secureStorage.getAll();
    const { typeDocument: documentType, document: documentNumber } = JSON.parse(
      getDBValue(db, SecureKeys.loginData)
    );

    this.facade.fetchNotificationItem({
      deviceId,
      documentType,
      documentNumber,
      id
    });
  }
  public enableNotifications(): void {
    this.navCtrl.navigateForward(NOTIFICATIONS);
  }

  private async setNewNotificationReadList(
    items: NotificationItem[]
  ): Promise<void> {
    const ids = items.map((item) => item.id);
    const readList = this.facade.notificationsReadList$.currentValue();

    const newReadList = readList
      .split(',')
      .filter((readItem) => readItem.length > 0)
      .concat(ids)
      .join(',');

    try {
      await this.secureStorage.put(
        SecureKeys.readNotificationsList,
        newReadList,
        true
      );

      this.facade.setReadNotificationsList(newReadList);
    } catch (e) {
      await this.showErrorAlert();
    }
  }

  private async setNewNotificationsDeletedList(
    items: NotificationItem[],
    messageSuccess: string
  ): Promise<void> {
    const ids = items.map((item) => item.id);
    const deletedList = this.facade.notificationsDeletedList$.currentValue();
    const newDeletedList = deletedList
      .split(',')
      .filter((deletedItem) => deletedItem.length > 0)
      .concat(ids)
      .join(',');

    try {
      await this.secureStorage.put(
        SecureKeys.deletedNotificationsList,
        newDeletedList,
        true
      );

      this.facade.setDeletedNotificationsList(newDeletedList);
      this.facade.showToast({
        type: ToastType.success,
        title: messageSuccess
      });
    } catch (e) {
      await this.showErrorAlert();
    }
  }

  private async showErrorAlert(): Promise<void> {
    await this.alertService.create({
      id: 'alert-notification-menu-error',
      type: AlertSheetType.error,
      icon: 'icons/error-x.svg',
      title: 'NOTIFICATION.MENU.MAILBOX.ERROR.TITLE',
      description: 'NOTIFICATION.MENU.MAILBOX.ERROR.DESCRIPTION'
    });
  }

  get transfiyaList$(): Observable<TransfiyaAuthorizationItem[]> {
    return this.facade.transfiyaList$;
  }

  get notificationsState$(): Observable<boolean> {
    return this.facade.pushNotificationsState$;
  }

  get workingNotifications$(): Observable<boolean> {
    return this.facade.workingNotifications$;
  }

  get notificationsList$(): Observable<NotificationItem[]> {
    return this.facade.notificationsList$.pipe(
      map((notifications) =>
        notifications.filter((notification) => {
          if (!(notification.notificationType === NotificationMailboxEnum.QR))
            return true;

          const notificationTime = new Date(notification.timestamp);
          const threeMinutesLater = new Date(
            notificationTime.getTime() + 3 * 60 * 1000
          );
          const now = new Date();

          return threeMinutesLater > now;
        })
      )
    );
  }

  get isEmpty$(): Observable<boolean> {
    return merge(this.transfiyaList$, this.notificationsList$).pipe(
      scan((acc, curr) => acc + curr.length, 0),
      map((count) => count === 0)
    );
  }
}
