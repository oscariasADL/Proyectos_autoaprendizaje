import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup
} from '@angular/forms';
import { QR_AUTHORIZATION } from '@app/commons/constants/navigate.constants';
import { ModalController } from '@commons/controllers/modal.controller';
import {
  AlertComponentType,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { NotificationItem } from '@commons/entities/notifications/notification.entities';
import { AlertService } from '@commons/services/alert.service';
import { NavController } from '@ionic/angular';
import { NotificationsAlertComponent } from '@modules/notifications/components/notifications-alert/notifications-alert.component';
import { NotificationMailboxEnum } from '../../constanst/notification.constants';
import { NotificationsFacade } from '../../notifications.facade';
import { CustomFactsOfPushNotification } from '../../entities/push-notification.interface';
import {
  mapCustomFactsOfPushNotification,
  mapPushNotificationAlert
} from '../../mappers/push-notification.mapper';
import { TranslateService } from '@ngx-translate/core';
import { PushNotificationService } from '../../services/push-notification.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-notifications-mailbox',
  templateUrl: './notifications-mailbox.component.html',
  styleUrls: ['./notifications-mailbox.component.sass']
})
export class NotificationsMailboxComponent implements OnInit {
  @Input() mailboxList: NotificationItem[] = [];
  @Input() notificationsState: boolean;
  @Input() showItemSelection: boolean;

  @Output() updateShowItemSelection: EventEmitter<boolean> = new EventEmitter();
  @Output() redirectNotifications: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() showItem: EventEmitter<NotificationItem> =
    new EventEmitter<NotificationItem>();
  @Output() deleteItem: EventEmitter<NotificationItem> =
    new EventEmitter<NotificationItem>();
  @Output() readSelectedItems: EventEmitter<NotificationItem[]> =
    new EventEmitter<NotificationItem[]>();
  @Output() deleteSelectedItems: EventEmitter<NotificationItem[]> =
    new EventEmitter<NotificationItem[]>();

  public form: UntypedFormGroup;

  private pushNotificationService = inject(PushNotificationService);

  private translateService = inject(TranslateService);
  public isLogged: boolean = false;

  constructor(
    private alertService: AlertService,
    private modalCtrl: ModalController,
    private navController: NavController,
    private notificationsFacade: NotificationsFacade
  ) {
    this.form = new UntypedFormGroup({
      notifications: new UntypedFormArray([])
    });
  }

  ngOnInit(): void {
    this.mailboxList.forEach(() =>
      this.notificationsFormArray.push(new UntypedFormControl(false))
    );

    this.notificationsFacade.isLogged$
      .pipe(map((value) => (this.isLogged = value)))
      .subscribe();
  }

  public async showMailboxItem(item: NotificationItem): Promise<void> {
    const handler: (item: NotificationItem) => void =
      this.notificationHandlers[item.notificationType];

    if (handler) {
      handler(item);
    }
  }

  notificationHandlers: { [key in NotificationMailboxEnum]: () => void } = {
    [NotificationMailboxEnum.QR]: this.handleQRNotification.bind(this),
    [NotificationMailboxEnum.PUSH]: this.handlePushNotification.bind(this),
    [NotificationMailboxEnum.DEFAULT]: this.handleDefaultNotification.bind(this)
  };

  public removeMailboxItem(item: NotificationItem): void {
    this.alertService
      .create({
        id: 'alert-mailbox-notification-delete',
        type: AlertSheetType.question,
        componentType: AlertComponentType.alertSheet,
        icon: 'icons/eliminar.svg',
        title: '¿Estas seguro de eliminar esta notificación?',
        description: 'No podrás recuperarla',
        buttons: ['Sí, eliminar', 'No, mantener']
      })
      .then((confirm) => {
        if (confirm) {
          this.deleteItem.emit(item);

          const index = this.mailboxList.findIndex((i) => i.id === item.id);
          this.notificationsFormArray.removeAt(index);
        }
      });
  }

  public selectAllNotifications(value: boolean = true): void {
    this.notificationsFormArray.controls.forEach((element) =>
      element.setValue(value)
    );
  }

  public readSelectedNotificationItems(): void {
    const items = this.getSelectedItems().filter((item) => !item.read);
    if (items.length > 0) {
      this.readSelectedItems.emit(items);
    }
    this.hideSelection();
  }

  public async deleteSelectedNotificationItems(): Promise<void> {
    const items = this.getSelectedItems();
    if (items.length > 0) {
      if (items.length === this.mailboxList.length) {
        const confirm = await this.alertService.create({
          id: 'alert-mailbox-notification-delete-all',
          type: AlertSheetType.question,
          componentType: AlertComponentType.alertSheet,
          icon: 'icons/eliminar.svg',
          title: 'NOTIFICATION.MENU.MAILBOX.DELETE_ALL',
          buttons: ['Sí, eliminar', 'No, Cancelar']
        });

        if (!confirm) {
          this.hideSelection();
          return;
        }
      }
      this.deleteSelectedItems.emit(items);
      this.hideSelection();
      items.forEach((item) =>
        this.notificationsFormArray.removeAt(item?.index)
      );
    } else {
      this.hideSelection();
    }
  }

  public showSelection(): void {
    this.updateShowItemSelection.emit(!this.showItemSelection);
  }
  public isPush(item: any): boolean {
    return (
      item.notificationType === this.notificationType.PUSH && this.isLogged
    );
  }

  public isDefault(item: any): boolean {
    return item.notificationType === this.notificationType.DEFAULT;
  }

  public isQR(item: any): boolean {
    return item.notificationType === this.notificationType.QR;
  }

  public hideSelection(): void {
    this.selectAllNotifications(false);
    this.showSelection();
  }

  private getSelectedItems(): NotificationItem[] {
    return this.notificationsFormArray.value
      .map((checked, index) =>
        checked ? { ...this.mailboxList[index], index } : null
      )
      .filter((item) => item !== null);
  }

  private handleQRNotification(item: NotificationItem): void {
    const { qrCode, timestamp, token, txId } = item;
    this.navController.navigateForward(QR_AUTHORIZATION, {
      queryParams: { qrCode, timestamp, token, txId }
    });
  }

  private async handleDefaultNotification(item: NotificationItem) {
    this.showItem.emit(item);
    const modal = await this.modalCtrl.create({
      component: NotificationsAlertComponent,
      componentProps: {
        id: 'notifications-alert-modal',
        item,
        removeMailboxItem: this.removeMailboxItem.bind(this)
      },
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });
    await modal.present();
  }

  private async handlePushNotification(item: NotificationItem) {
    const decryptedMessage =
      await this.pushNotificationService.decryptNotificationMessage(
        item.message
      );

    const notificacionData: CustomFactsOfPushNotification =
      mapCustomFactsOfPushNotification(decryptedMessage);

    this.notificationsFacade.showPushNotificationModal(
      mapPushNotificationAlert(notificacionData, this.translateService),
      notificacionData,
      item
    );
  }

  get notificationsFormArray(): UntypedFormArray {
    return this.form.get('notifications') as UntypedFormArray;
  }

  get showRemoveSelection(): boolean {
    return this.getSelectedItems().length === this.mailboxList.length;
  }

  get notificationType(): typeof NotificationMailboxEnum {
    return NotificationMailboxEnum;
  }
}
