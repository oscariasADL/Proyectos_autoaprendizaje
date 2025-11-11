import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController } from '@commons/controllers/modal.controller';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { MailboxDatePipe } from '@commons/pipes/mailbox-date.pipe';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';

import { NotificationsAlertComponent } from './notifications-alert.component';
import { NotificationItem } from '@commons/entities/notifications/notification.entities';
import { NotificationMailboxEnum } from '../../constanst/notification.constants';

describe('NotificationsAlertComponent', () => {
  let component: NotificationsAlertComponent;
  let fixture: ComponentFixture<NotificationsAlertComponent>;
  let modalCtrlSpy;

  beforeEach(waitForAsync(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', [
      'create',
      'dismiss'
    ]);
    TestBed.configureTestingModule({
      declarations: [
        NotificationsAlertComponent,
        ImageUrlPipe,
        MailboxDatePipe
      ],
      imports: [TestingModule, IonicModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsAlertComponent);
    component = fixture.componentInstance;
    component.item = {
      id: '12345',
      title: 'Aviso de transacción pendiente',
      message: 'Usted tiene una transacción pendiente por aceptar',
      date: '2022-01-11',
      read: false,
      isTransaction: true,
      notificationType: NotificationMailboxEnum.DEFAULT
    };
    component.removeMailboxItem = (item: NotificationItem): void => {
      return;
    };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeModal()', async () => {
    spyOn(component, 'closeModal').and.callThrough();
    await component.closeModal();
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should call removeItem()', () => {
    expect(component.removeItem()).toBeUndefined();
  });

  it('should call ngDestroy()', () => {
    const componentAny = component as any;
    componentAny.subscription = null;
    expect(componentAny.ngOnDestroy()).toBeUndefined();
  });
});
