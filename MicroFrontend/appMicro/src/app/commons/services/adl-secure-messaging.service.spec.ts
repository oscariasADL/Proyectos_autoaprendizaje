import { TestBed } from '@angular/core/testing';
import { AdlSecureMessagingService } from './adl-secure-messaging.service';

describe('AdlSecureMessagingService', () => {
  let service: AdlSecureMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdlSecureMessagingService]
    });
    service = TestBed.inject(AdlSecureMessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call parseBodyTransaction', async () => {
    spyOn(service, 'parseBodyTransaction').and.callThrough();
    try {
      await service.parseBodyTransaction({ value: '834u3uje' });
      expect(service.parseBodyTransaction).toHaveBeenCalled();
    } catch (error) {
      fail(`parseBodyTransaction threw an error: ${error}`);
    }
  });
});
