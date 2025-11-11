import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationItem } from '@commons/entities/notifications/notification.entities';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AlertService } from '@commons/services/alert.service';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { NotificationsFacade } from '@modules/notifications/notifications.facade';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';
import { NotificationsFacadeMock } from '@testing/mocks/facade/notifications.facade.mock';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { TestingModule } from '@testing/testing.module';

import { NotificationsMenuComponent } from './notifications-menu.component';
import { NOTIFICATIONS } from '@app/commons/constants/navigate.constants';
import { NotificationMailboxEnum } from '../../constanst/notification.constants';

describe('NotificationsMenuComponent', () => {
  let component: NotificationsMenuComponent;
  let fixture: ComponentFixture<NotificationsMenuComponent>;
  let adlSecureStorageService: AdlSecureStorageService;
  const navControlSpy = jasmine.createSpyObj<NavController>([
    'navigateRoot',
    'navigateForward'
  ]);
  const menuCtrlSpy = jasmine.createSpyObj('MenuController', ['close']);
  const generateNotificationItem = (): NotificationItem => ({
    id: '12345',
    title: 'Aviso de transacción pendiente',
    message: 'Usted tiene una transacción pendiente por aceptar',
    date: '2022-01-11',
    read: false,
    isTransaction: true,
    notificationType: NotificationMailboxEnum.DEFAULT
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsMenuComponent, ImageUrlPipe],
      imports: [TestingModule, IonicModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: NavController, useValue: navControlSpy },
        { provide: MenuController, useValue: menuCtrlSpy },
        {
          provide: NotificationsFacade,
          useClass: NotificationsFacadeMock
        },
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        },
        {
          provide: AlertService,
          useClass: AlertServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsMenuComponent);
    component = fixture.componentInstance;
    adlSecureStorageService = TestBed.inject(AdlSecureStorageService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should call doRefresh', () => {
    component.doRefresh();
    expect(component.ionRefresher.complete).toHaveBeenCalled();
  });

  it('should call goToTransfiyaAuthorization', () => {
    fixture.ngZone.run(() => {
      component.goToTransfiyaAuthorization({
        amount: 1000,
        targetNumber: '',
        note: '',
        transactionId: '',
        isRequest: true
      });
      expect(navControlSpy.navigateForward).toHaveBeenCalled();
    });
  });

  it('should call redirectNotifications', () => {
    fixture.ngZone.run(() => {
      spyOn(component, 'redirectNotifications').and.callThrough();
      component.redirectNotifications();
      expect(component.redirectNotifications).toHaveBeenCalled();
      expect(navControlSpy.navigateForward).toHaveBeenCalledWith(NOTIFICATIONS);
    });
  });

  it('should call closeMenu', async () => {
    menuCtrlSpy.close.and.returnValue(Promise.resolve(true));
    await component.closeMenu();
    expect(menuCtrlSpy.close).toHaveBeenCalled();
  });

  it('should call readNotificationsItem', async () => {
    const notificationItem = generateNotificationItem();
    await component.readNotificationsItem(notificationItem);
    expect(component.readNotificationsItem).toBeDefined();
  });

  it('should call readSelectedNotificationItems', async () => {
    const notificationItem = generateNotificationItem();
    await component.readSelectedNotificationItems([notificationItem]);
    expect(component.readSelectedNotificationItems).toBeDefined();
  });

  it('should call deleteNotificationsItem', async () => {
    const notificationItem = generateNotificationItem();
    await component.deleteNotificationsItem(notificationItem);
    expect(component.deleteNotificationsItem).toBeDefined();
  });

  it('should call deleteSelectedNotificationItems', async () => {
    const notificationItem = generateNotificationItem();
    await component.deleteSelectedNotificationItems([notificationItem]);
    expect(component.deleteSelectedNotificationItems).toBeDefined();
  });

  it('should call fetchNotificationItem', async () => {
    const notificationItem = generateNotificationItem();
    await component.fetchNotificationItem(notificationItem);
    expect(component.fetchNotificationItem).toBeDefined();
  });

  it('should pushNotificationsState$', () => {
    expect(component.notificationsState$.currentValue()).toEqual(false);
  });

  it('should handle error and call showErrorAlert', async () => {
    const notificationItem = generateNotificationItem();
    spyOn(adlSecureStorageService, 'put').and.callFake(() => {
      throw new Error();
    });
    const showErrorAlertSpy = spyOn<any>(
      component,
      'showErrorAlert'
    ).and.callThrough();

    await component.deleteNotificationsItem(notificationItem);
    expect(showErrorAlertSpy).toHaveBeenCalled();

    await component.readNotificationsItem(notificationItem);
    expect(showErrorAlertSpy).toHaveBeenCalled();
  });
});
