import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { PushNotificationRegisterService } from './push-notification-register.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { TogglePushNotificationsType } from '@commons/entities/notifications/push-notification-register.entities';

describe('PushNotificationRegisterService', () => {
  const setup = (): {
    service: PushNotificationRegisterService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(PushNotificationRegisterService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PushNotificationRegisterService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should be created', () => {
    const service: PushNotificationRegisterService = TestBed.inject(
      PushNotificationRegisterService
    );
    expect(service).toBeTruthy();
  });

  it('should to call Toggle Notifications', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.notifications.toggle);
    const mockData = {};
    service
      .togglePushNotifications({ action: TogglePushNotificationsType.ENABLE })
      .subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call Toggle Notifications Delete', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.notifications.toggle);
    const mockData = {};
    service
      .togglePushNotifications({
        action: TogglePushNotificationsType.DISABLE
      })
      .subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('DELETE');
  });
});
