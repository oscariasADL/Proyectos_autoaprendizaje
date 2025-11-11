import { TestBed } from '@angular/core/testing';
import { NewRelicService } from './new-relic.service';
import { AppFacade } from '@app/app.facade';
import { Capacitor } from '@capacitor/core';
import { environment as ENV } from '@environment';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { Util } from '@app/commons/utils/util';
import { of } from 'rxjs';

import { NewRelicCapacitorPlugin } from '@newrelic/newrelic-capacitor-plugin';

describe('NewRelicService', () => {
  let service: NewRelicService;
  let getPlatformSpy: jasmine.Spy;
  let isNativeSpy: jasmine.Spy;
  let featureFlagsSpy: jasmine.Spy;

  const appFacadeMock = {
    featureFlagsByKey: jasmine.createSpy()
  };

  beforeEach(() => {
    getPlatformSpy = spyOn(Capacitor, 'getPlatform').and.returnValue('ios');
    isNativeSpy = spyOn(Util, 'isNative').and.returnValue(true);

    TestBed.configureTestingModule({
      providers: [{ provide: AppFacade, useValue: appFacadeMock }]
    });

    service = TestBed.inject(NewRelicService);
    featureFlagsSpy = appFacadeMock.featureFlagsByKey;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAppToken', () => {
    it('should return iOS token if platform is ios', () => {
      expect((service as any).getAppToken()).toBe(ENV.newRelic.iOSApp);
    });

    it('should return Android token if platform is android', () => {
      getPlatformSpy.and.returnValue('android');
      expect((service as any).getAppToken()).toBe(ENV.newRelic.androidApp);
    });
  });

  describe('getAgentConfig', () => {
    it('should return correct agent configuration', () => {
      const config = (service as any).getAgentConfig();
      expect(config.analyticsEventEnabled).toBeTrue();
      expect(config.logLevel).toBeDefined();
    });
  });

  describe('initNewRelic', () => {
    it('should start NewRelic plugin if native', () => {
      const startSpy = spyOn(NewRelicCapacitorPlugin, 'start');
      const logSpy = spyOn<any>(service, 'log');

      service.initNewRelic();

      expect(startSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledWith(
        '[New Relic] Initialized successfully'
      );
    });

    it('should not start NewRelic if not native', () => {
      isNativeSpy.and.returnValue(false);
      const startSpy = spyOn(NewRelicCapacitorPlugin, 'start');

      service.initNewRelic();

      expect(startSpy).not.toHaveBeenCalled();
    });

    it('should log error if start throws', () => {
      spyOn(NewRelicCapacitorPlugin, 'start').and.throwError('fail');
      const errorSpy = spyOn<any>(service, 'logError');

      service.initNewRelic();

      expect(errorSpy).toHaveBeenCalledWith(
        '[New Relic] Initialization failed:',
        jasmine.any(Error)
      );
    });
  });

  describe('recordEvent', () => {
    it('should record event if native and feature flag enabled', () => {
      featureFlagsSpy.and.returnValue(true);
      const setUserIdSpy = spyOn(NewRelicCapacitorPlugin, 'setUserId');
      const recordEventSpy = spyOn(
        NewRelicCapacitorPlugin,
        'recordCustomEvent'
      );
      const logSpy = spyOn<any>(service, 'log');

      service.recordEvent('type', 'name', 'user123', { foo: 'bar' });

      expect(setUserIdSpy).toHaveBeenCalledWith({ userId: 'user123' });
      expect(recordEventSpy).toHaveBeenCalledWith({
        eventType: 'type',
        eventName: 'name',
        attributes: { foo: 'bar' }
      });
      expect(logSpy).toHaveBeenCalledWith(
        '[New Relic] Event recorded: type - name'
      );
    });

    it('should not record event if not native', () => {
      isNativeSpy.and.returnValue(false);
      const setUserIdSpy = spyOn(NewRelicCapacitorPlugin, 'setUserId');

      service.recordEvent('type', 'name', 'user123');

      expect(setUserIdSpy).not.toHaveBeenCalled();
    });

    it('should not record event if feature flag disabled', () => {
      featureFlagsSpy.and.returnValue(false);
      const setUserIdSpy = spyOn(NewRelicCapacitorPlugin, 'setUserId');

      service.recordEvent('type', 'name', 'user123');

      expect(setUserIdSpy).not.toHaveBeenCalled();
    });

    it('should log error if recordCustomEvent throws', () => {
      featureFlagsSpy.and.returnValue(true);
      spyOn(NewRelicCapacitorPlugin, 'setUserId');
      spyOn(NewRelicCapacitorPlugin, 'recordCustomEvent').and.throwError(
        'fail'
      );
      const errorSpy = spyOn<any>(service, 'logError');

      service.recordEvent('type', 'name', 'user123');

      expect(errorSpy).toHaveBeenCalledWith(
        '[New Relic] Failed to record event:',
        jasmine.any(Error)
      );
    });
  });

  describe('shutdowntNewRelic', () => {
    it('should shutdown plugin if native', () => {
      const shutdownSpy = spyOn(NewRelicCapacitorPlugin, 'shutdown');
      const logSpy = spyOn<any>(service, 'log');

      service.shutdowntNewRelic();

      expect(shutdownSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledWith('[New Relic] Shutdown successfully');
    });

    it('should not shutdown if not native', () => {
      isNativeSpy.and.returnValue(false);
      const shutdownSpy = spyOn(NewRelicCapacitorPlugin, 'shutdown');

      service.shutdowntNewRelic();

      expect(shutdownSpy).not.toHaveBeenCalled();
    });

    it('should log error if shutdown throws', () => {
      spyOn(NewRelicCapacitorPlugin, 'shutdown').and.throwError('fail');
      const errorSpy = spyOn<any>(service, 'logError');

      service.shutdowntNewRelic();

      expect(errorSpy).toHaveBeenCalledWith(
        '[New Relic] Shutdown failed:',
        jasmine.any(Error)
      );
    });
  });
});
