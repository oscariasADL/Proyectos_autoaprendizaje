import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { HeadersFacade } from '@commons/components/headers/headers.facade';
import {
  BACKGROUND_RED,
  BACKGROUND_WHITE,
  HeaderType,
  SHOW_BACK_ICON,
  SHOW_CLOSE_ICON,
  SHOW_LOGO_ICON,
  SHOW_MENU_ICON,
  SHOW_NOTIFICATION_ICON
} from '@commons/entities/header/header.interface';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { cancelSubscription } from '@commons/utils/util';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { merge, Observable, Subscription } from 'rxjs';
import { filter, map, scan, take } from 'rxjs/operators';
import { DataBasicClientDto } from '@commons/entities/auth/auth.entities';
import { CustomEventService } from '@commons/services/custom-events.service';
import { MICROFRONTEND_TOPICS } from '@commons/constants/microfrontend-events.constants';
import { NotificationMailboxEnum } from '@app/modules/notifications/constanst/notification.constants';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadersComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() backUrl: string;
  @Input() closeUrl: string;
  @Input() type: HeaderType = HeaderType.redSecondary;

  @Output() closeAction: EventEmitter<void> = new EventEmitter<void>();

  private subscription: Subscription;

  constructor(
    private platform: Platform,
    private facade: HeadersFacade,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private customEventService: CustomEventService
  ) {}

  ngOnInit(): void {
    this.listenBackButton();
    this.facade.basicData$
      .pipe(
        filter((basicData) => !isNullOrUndefined(basicData)),
        take(1)
      )
      .subscribe((basicData) => {
        this.customEventService.publishCustomEvent(
          MICROFRONTEND_TOPICS.BASIC_CUSTOMER_INFORMATION,
          {
            value: basicData
          }
        );
      });
  }

  ngOnDestroy(): void {
    cancelSubscription(this.subscription);
  }

  public goBack(): void {
    if (this.backUrl) {
      this.navCtrl.navigateBack(this.backUrl);
    } else if (this.closeAction.observed) {
      this.closeAction.emit();
    } else {
      this.navCtrl.pop();
    }
  }

  public close(): void {
    if (!isNullOrUndefined(this.closeUrl)) {
      this.navCtrl.navigateBack(this.closeUrl);
    } else if (this.closeAction.observed) {
      this.closeAction.emit();
    } else {
      this.goBack();
    }
  }

  public async openMenu(menuId: string): Promise<void> {
    this.facade.fetchNotificationsIfNecessary();
    this.facade.fetchTransfiyaAuthorizationsIfNecessary();
    await this.menuCtrl.open(menuId);
  }

  private listenBackButton(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.first,
      () => this.goBack()
    );
  }

  get basicData$(): Observable<DataBasicClientDto> {
    return this.facade.basicData$;
  }
  //
  get totalNotifications$(): Observable<number> {
    return merge(
      this.facade.transfiyaList$,
      this.facade.notificationsList$.pipe(
        map((notifications) =>
          notifications.filter((notification) => {
            if (notification.read) return false;

            if (notification.notificationType !== NotificationMailboxEnum.QR) {
              return true;
            }

            const notificationTime = new Date(notification.timestamp);
            const threeMinutesLater = new Date(
              notificationTime.getTime() + 3 * 60 * 1000
            );
            const now = new Date();

            return threeMinutesLater > now;
          })
        )
      )
    ).pipe(scan((acc, curr) => acc + curr?.length, 0));
  }

  get headerType(): typeof HeaderType {
    return HeaderType;
  }

  get showLogoIcon(): boolean {
    return SHOW_LOGO_ICON.includes(this.type);
  }

  get showCloseIcon(): boolean {
    return SHOW_CLOSE_ICON.includes(this.type);
  }

  get showNotificationIcon(): boolean {
    return SHOW_NOTIFICATION_ICON.includes(this.type);
  }

  get showMenuIcon(): boolean {
    return SHOW_MENU_ICON.includes(this.type);
  }

  get showBackIcon(): boolean {
    return SHOW_BACK_ICON.includes(this.type);
  }

  get backgroundColor(): string {
    if (BACKGROUND_RED.includes(this.type)) return 'red';
    return BACKGROUND_WHITE.includes(this.type) ? 'white' : '';
  }
}
