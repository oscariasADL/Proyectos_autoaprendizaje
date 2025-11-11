import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  fakeAsync,
  tick
} from '@angular/core/testing';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  ReactiveFormsModule
} from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { MailboxDatePipe } from '@commons/pipes/mailbox-date.pipe';
import { AlertService } from '@commons/services/alert.service';
import { IonicModule } from '@ionic/angular';
import { AlertServiceMock } from '@testing/mocks/services/alert.service.mock';
import { TestingModule } from '@testing/testing.module';

import { NotificationsMailboxComponent } from './notifications-mailbox.component';
import { NotificationItem } from '@app/commons/entities/notifications/notification.entities';
import { RouterTestingModule } from '@angular/router/testing';
import { QR_AUTHORIZATION } from '@app/commons/constants/navigate.constants';
import { NotificationMailboxEnum } from '../../constanst/notification.constants';
import { NotificationFacadeMock } from '@testing/mocks/facade/notification.facade.mock';
import { NotificationsFacade } from '../../notifications.facade';
import { PushNotificationService } from '../../services/push-notification.service';
import { PushNotificationServiceMock } from '@testing/mocks/services/push-notification.service.mock';
import { of } from 'rxjs';

describe('NotificationsMailboxComponent', () => {
  let component: NotificationsMailboxComponent;
  let fixture: ComponentFixture<NotificationsMailboxComponent>;
  let alertService: AlertService;
  let navController: NavController;
  let modalCtrl: ModalController;
  let notificationsFacade: NotificationsFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotificationsMailboxComponent,
        ImageUrlPipe,
        MailboxDatePipe
      ],
      imports: [
        TestingModule,
        IonicModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: AlertService, useClass: AlertServiceMock },
        ModalController,
        {
          provide: NavController,
          useValue: jasmine.createSpyObj('NavController', ['navigateForward'])
        },
        { provide: NotificationsFacade, useValue: NotificationFacadeMock },
        {
          provide: PushNotificationService,
          useValue: PushNotificationServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsMailboxComponent);
    component = fixture.componentInstance;
    navController = TestBed.inject(NavController);
    modalCtrl = TestBed.inject(ModalController);

    component.mailboxList = [
      {
        id: '12345',
        title: 'Aviso de transacción pendiente',
        message: 'Usted tiene una transacción pendiente por aceptar',
        date: '2022-01-11',
        read: false,
        isTransaction: true,
        notificationType: NotificationMailboxEnum.DEFAULT
      }
    ];
    component.notificationsState = false;
    component.form = new UntypedFormBuilder().group({
      notifications: new UntypedFormArray([])
    });
    alertService = TestBed.inject(AlertService);
    notificationsFacade = TestBed.inject(NotificationsFacade);
    notificationsFacade.isLogged$ = of(true);

    fixture.detectChanges();
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showMailboxItem', fakeAsync(() => {
    spyOn(component, 'showMailboxItem').and.callThrough();
    component.showMailboxItem(component.mailboxList[0]);
    tick();
    expect(component.showMailboxItem).toHaveBeenCalled();
  }));

  it('should removeMailboxItem', fakeAsync(() => {
    spyOn(component, 'removeMailboxItem').and.callThrough();
    const alertServiceCreateSpy = spyOn(alertService, 'create');

    alertServiceCreateSpy.and.returnValue(Promise.resolve(true));
    component.removeMailboxItem(component.mailboxList[0]);
    tick();
    expect(component.removeMailboxItem).toHaveBeenCalled();

    alertServiceCreateSpy.and.returnValue(Promise.resolve(false));
    component.removeMailboxItem(component.mailboxList[0]);
    tick();
    expect(component.removeMailboxItem).toHaveBeenCalled();
  }));

  it('should call selectAllNotifications()', () => {
    expect(component.selectAllNotifications()).toBeUndefined();
  });

  it('should call readSelectedNotificationItems()', () => {
    expect(component.readSelectedNotificationItems()).toBeUndefined();
  });

  // Fix 3: Handle async operations in deleteSelectedNotificationItems
  it('should call deleteSelectedNotificationItems()', fakeAsync(() => {
    const alertServiceCreateSpy = spyOn(alertService, 'create');

    component.showSelection();
    component.selectAllNotifications();

    spyOn(component, 'deleteSelectedNotificationItems').and.callThrough();

    alertServiceCreateSpy.and.returnValue(Promise.resolve(true));
    component.deleteSelectedNotificationItems();
    tick();
    expect(component.deleteSelectedNotificationItems).toHaveBeenCalled();

    alertServiceCreateSpy.and.returnValue(Promise.resolve(false));
    component.deleteSelectedNotificationItems();
    tick();
    expect(component.deleteSelectedNotificationItems).toHaveBeenCalled();

    component.selectAllNotifications(false);
    component.deleteSelectedNotificationItems();
    tick();
    expect(component.deleteSelectedNotificationItems).toHaveBeenCalled();
  }));

  it('should return boolean, get showRemoveSelection()', () => {
    expect(component.showRemoveSelection).toEqual(jasmine.any(Boolean));
  });

  it('should navigate to QR authorization if item has qr', waitForAsync(async () => {
    const item = {
      notificationType: NotificationMailboxEnum.QR,
      qrCode: '12345',
      timestamp: '2025-03-05T12:00:00',
      token: 'abcde',
      txId: '67890'
    } as NotificationItem;

    (navController.navigateForward as jasmine.Spy).and.returnValue(
      Promise.resolve(true)
    );

    await component.showMailboxItem(item);

    const { qrCode, timestamp, token, txId } = item;
    expect(navController.navigateForward).toHaveBeenCalledWith(
      QR_AUTHORIZATION,
      {
        queryParams: { qrCode, timestamp, token, txId }
      }
    );
  }));

  it('should show modal with a default notification', waitForAsync(() => {
    const defaultNotification: NotificationItem = {
      id: '00525900h45323493397',
      title: 'Información Saldo',
      message:
        'AVVillas. El saldo de su cuenta CUENTA MOVIL No. *9634 es de $41.85, el cual es menor al tope establecido de $8,500,000.00',
      date: '2021-08-11T15:25:29',
      read: true,
      isTransaction: false,
      notificationType: NotificationMailboxEnum.DEFAULT
    };

    const modalSpy = jasmine.createSpyObj('Modal', ['present']);
    modalSpy.present.and.returnValue(Promise.resolve());

    spyOn(modalCtrl, 'create').and.returnValue(Promise.resolve(modalSpy));
    spyOn(component.showItem, 'emit');
    component.showMailboxItem(defaultNotification);
    expect(component.showItem.emit).toHaveBeenCalledWith(defaultNotification);
  }));

  it('should call notificationType', () => {
    expect(typeof component.notificationType).toEqual(
      typeof NotificationMailboxEnum
    );
  });
});
