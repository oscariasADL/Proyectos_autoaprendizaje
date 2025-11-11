import { TestBed } from '@angular/core/testing';

import { ActivateOneSpanDigipassService } from './activate-one-span-digipass.service';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AdlDigipassService } from '@commons/services/adl-digipass.service';

describe('ActivateOneSpanDigipassService', () => {
  let service: ActivateOneSpanDigipassService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdlSecureStorageService,
        AdlDigipassService,
        ActivateOneSpanDigipassService
      ]
    });
    service = TestBed.inject(ActivateOneSpanDigipassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call activateLicense', async () => {
    try {
      const result = await service.activateLicense({
        enrollmentKey: '7267267'
      });
      expect(result).toBeTruthy();
    } catch (error) {
      fail(`activateLicense threw an error: ${error}`);
    }
  });

  it('should call activateInstance', async () => {
    try {
      const result = await service.activateInstance({
        enrollmentKey: '7267267'
      });
      expect(result).toBeTruthy();
    } catch (error) {
      fail(`activateInstance threw an error: ${error}`);
    }
  });
});
