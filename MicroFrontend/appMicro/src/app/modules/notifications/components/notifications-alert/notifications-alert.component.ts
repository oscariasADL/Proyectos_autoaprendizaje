import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ModalController } from '@commons/controllers/modal.controller';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { NotificationItem } from '@commons/entities/notifications/notification.entities';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications-alert',
  templateUrl: './notifications-alert.component.html',
  styleUrls: ['./notifications-alert.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsAlertComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() item: NotificationItem;
  @Input() removeMailboxItem: (item: NotificationItem) => void;

  private subscription: Subscription;

  constructor(private platform: Platform, private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.third,
      () => {
        this.closeModal();
      }
    );
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }

  public closeModal(data: any = null): void {
    this.modalCtrl.dismiss(data);
  }

  public removeItem(): void {
    this.removeMailboxItem(this.item);
    this.closeModal();
  }
}
