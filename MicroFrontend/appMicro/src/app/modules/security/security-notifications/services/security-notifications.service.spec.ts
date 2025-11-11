import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { SecurityNotificationsType } from '@modules/security/security-notifications/entities/security-notifications.interface';
import { SecurityNotificationsService } from './security-notifications.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SecurityNotificationsService', () => {
  const setup = (): {
    service: SecurityNotificationsService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(SecurityNotificationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecurityNotificationsService, CapitalizePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
  );

  it('should be created', () => {
    const service: SecurityNotificationsService = TestBed.inject(
      SecurityNotificationsService
    );
    expect(service).toBeTruthy();
  });

  it('should to call Toggle Notifications', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.notifications.toggle);
    const mockData = {};
    service
      .toggleSecurityNotifications({ action: SecurityNotificationsType.ENABLE })
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
      .toggleSecurityNotifications({
        action: SecurityNotificationsType.DISABLE
      })
      .subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('DELETE');
  });
});
