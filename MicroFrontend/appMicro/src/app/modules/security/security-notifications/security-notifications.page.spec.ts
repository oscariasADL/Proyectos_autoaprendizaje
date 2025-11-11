import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { SecurityNotificationsFacade } from '@modules/security/security-notifications/security-notifications.facade';
import { SecurityNotificationsFacadeMock } from '@testing/mocks/facade/security-notifications.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { SecurityNotificationsPage } from './security-notifications.page';

describe('SecurityNotificationsPage', () => {
  let component: SecurityNotificationsPage;
  let fixture: ComponentFixture<SecurityNotificationsPage>;
  let navControlSpy;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', ['navigateBack']);
    TestBed.configureTestingModule({
      declarations: [SecurityNotificationsPage],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: NavController, useValue: navControlSpy },
        {
          provide: SecurityNotificationsFacade,
          useClass: SecurityNotificationsFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SecurityNotificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close', () => {
    spyOn(component, 'close').and.callThrough();
    component.close();
    expect(component.close).toHaveBeenCalled();
  });

  it('should call backSecurity', () => {
    spyOn(component, 'backSecurity').and.callThrough();
    component.backSecurity();
    expect(component.backSecurity).toHaveBeenCalled();
  });

  it('should call disableNotifications', () => {
    spyOn(component, 'disableNotifications').and.callThrough();
    component.disableNotifications();
    expect(component.disableNotifications).toHaveBeenCalled();
  });

  it('should return securityNotificationsResponse$', () => {
    expect(component.securityNotificationsResponse$).toBeDefined();
  });
});
