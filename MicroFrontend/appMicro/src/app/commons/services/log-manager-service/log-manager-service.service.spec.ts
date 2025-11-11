import { TestBed } from '@angular/core/testing';
import { LogManagerService } from './log-manager-service.service';
import {
  LogMessageDetails,
  LogSeverity
} from './entities/log-manager-service.interface';
import { Capacitor } from '@capacitor/core';
import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
import { Util } from '@app/commons/utils/util';

describe('LogManagerService', () => {
  let service: LogManagerService;
  let getPlatformSpy: jasmine.Spy;
  let isNativeSpy: jasmine.Spy;

  beforeEach(() => {
    getPlatformSpy = spyOn(Capacitor, 'getPlatform').and.returnValue('ios');
    isNativeSpy = spyOn(Util, 'isNative').and.returnValue(true);

    TestBed.configureTestingModule({
      providers: [LogManagerService]
    });
    service = TestBed.inject(LogManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('log()', () => {
    const logMessageDetails: LogMessageDetails = {
      severity: LogSeverity.INFO,
      fileName: 'bootstrap.effects.ts',
      functionName: 'initInterchangeKeyEffect$',
      customMessage: 'Removed randomeKey and sessionHash',
      userId: 'user123'
    };

    beforeEach(() => {
      spyOn(FirebaseCrashlytics, 'setUserId').and.returnValue(
        Promise.resolve()
      );
      spyOn(FirebaseCrashlytics, 'recordException').and.returnValue(
        Promise.resolve()
      );
    });

    it('should not log if platform is not native', async () => {
      isNativeSpy.and.returnValue(false);

      await service.log(logMessageDetails);

      expect(FirebaseCrashlytics.setUserId).not.toHaveBeenCalled();
      expect(FirebaseCrashlytics.recordException).not.toHaveBeenCalled();
    });

    it('should log correctly on native platform', async () => {
      await service.log(logMessageDetails);

      expect(FirebaseCrashlytics.setUserId).toHaveBeenCalledWith({
        userId: 'user123'
      });
      expect(FirebaseCrashlytics.recordException).toHaveBeenCalledWith({
        message: `[UserID]:user123 [INFO]: Removed randomeKey and sessionHash`,
        stacktrace: [
          {
            fileName: 'bootstrap.effects.ts',
            functionName: 'initInterchangeKeyEffect$'
          }
        ]
      });
    });

    it('should include error stacktrace if error is provided', async () => {
      const error = new Error('Test error');
      const detailsWithError = { ...logMessageDetails, error };

      await service.log(detailsWithError);

      expect(FirebaseCrashlytics.recordException).toHaveBeenCalledWith(
        jasmine.objectContaining({
          stacktrace: [
            {
              fileName: 'bootstrap.effects.ts',
              functionName: 'initInterchangeKeyEffect$'
            },
            error.stack
          ]
        })
      );
    });
  });
});
