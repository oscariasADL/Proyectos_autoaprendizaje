import { TestBed } from '@angular/core/testing';
import { AdlDeviceFingerprintService } from './adl-device-fingerprint.service';

describe('AdlDeviceFingerprintService', () => {
  let service: AdlDeviceFingerprintService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdlDeviceFingerprintService]
    });
    service = TestBed.inject(AdlDeviceFingerprintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getFingerprint', (done) => {
    service.getFingerprint('').subscribe({
      next: ({ fingerPrint }) => {
        expect(fingerPrint).toBeTruthy();
        done();
      },
      error: (error) => {
        fail(`getFingerprint threw an error: ${error}`);
        done();
      }
    });
  });
});
