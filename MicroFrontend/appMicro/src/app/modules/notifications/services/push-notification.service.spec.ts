import { TestBed } from '@angular/core/testing';

import { PushNotificationService } from './push-notification.service';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { AdlDigipassService } from '@app/commons/services/adl-digipass.service';
import { AdlSecureMessagingService } from '@app/commons/services/adl-secure-messaging.service';
import { NotificationsService } from '@app/commons/services/notifications.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SecureKeys } from '@app/commons/constants/keys.constants';

describe('PushNotificationService', () => {
  let service: PushNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      providers: [
        { provide: AppFacade, useClass: AppFacadeMock },
        AdlDigipassService,
        AdlSecureMessagingService,
        NotificationsService
      ]
    });
    service = TestBed.inject(PushNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call to decryptNotificationMessage', async () => {
    expect(
      await service.decryptNotificationMessage('asdsasddooweoweorweda')
    ).toBeDefined();
  });
  it('should be call to getNotificationInfo', () => {
    const fakeDB = [
      {
        key: SecureKeys.loginData,
        value: JSON.stringify({ typeDocument: 'CC', document: '1234' })
      }
    ];

    expect(service.getNotificationInfo('1234', fakeDB)).toBeDefined();
  });
});
