import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { BiometricService } from './biometric.service';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { AlertService } from '@commons/services/alert.service';
import { AnalyticsService } from '@commons/services/analytics.service';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { TranslateService } from '@ngx-translate/core';
import {
  BiometricErrors,
  BiometricType,
  BiometricOptions,
  BiometricIconClass
} from '@modules/auth/login/entities/biometric.interface';

import { LoginUserPayload } from '@modules/auth/login/entities/login-user-payload.interface';
import { SecureKeys } from '@commons/constants/keys.constants';
import { AnalyticsServiceMock } from './mocks/Analytics.mock';
import { TranslateServiceMock } from './mocks/translateService.mock';
import { AlertServiceMock } from './mocks/alertService.mock';
import { AdlSecureStorageServiceMock } from './mocks/adlSecureStorage.mock';
import { FingerprintAIOMock } from './mocks/fingerPrintAIO.mock';
import { StoreModule } from '@ngrx/store';

describe('BiometricService', () => {
  let service: BiometricService;
  let secureStorage: AdlSecureStorageService;
  let fingerprintAIO: FingerprintAIO;
  let alert: AlertService;
  let translate: TranslateService;
  let analytics: AnalyticsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        BiometricService,
        { provide: FingerprintAIO, useClass: FingerprintAIOMock },
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        },
        { provide: AlertService, useClass: AlertServiceMock },
        { provide: TranslateService, useClass: TranslateServiceMock },
        { provide: AnalyticsService, useClass: AnalyticsServiceMock }
      ]
    });
    service = TestBed.inject(BiometricService);
    secureStorage = TestBed.inject(AdlSecureStorageService);
    fingerprintAIO = TestBed.inject(FingerprintAIO);
    alert = TestBed.inject(AlertService);
    translate = TestBed.inject(TranslateService);
    analytics = TestBed.inject(AnalyticsService);
  });
  it('should be created and set hasLoaded$ to true after init', async () => {
    await service.initBiometrics();
    service.hasLoaded$.subscribe((loaded) => {
      expect(loaded).toBeTrue();
    });
  });
  describe('setBiometricType', () => {
    it('should set type Finger when getBiometricType returns "biometric"', async () => {
      spyOn(service, 'getBiometricType').and.returnValue(
        Promise.resolve('biometric')
      );
      await service.setBiometricType();
      expect(service.biometricType$.value).toEqual(BiometricType.Finger);
    });
    it('should set type Face when getBiometricType returns "face"', async () => {
      spyOn(service, 'getBiometricType').and.returnValue(
        Promise.resolve('face')
      );
      await service.setBiometricType();
      expect(service.biometricType$.value).toEqual(BiometricType.Face);
    });
    it('should set type to null for any other response', async () => {
      spyOn(service, 'getBiometricType').and.returnValue(
        Promise.resolve('other')
      );
      await service.setBiometricType();
      expect(service.biometricType$.value).toBeNull();
    });
  });
  describe('setHasBiometricRegistered & setHasBiometricDenied', () => {
    it('should set hasBiometricRegistered$ to true if biometric key exists', async () => {
      await secureStorage.put(SecureKeys.biometric, BiometricType.Finger);
      await service.setHasBiometricRegistered();
      expect(service.hasBiometricRegistered$.value).toBeTrue();
    });
    it('should set hasBiometricDenied$ to true if hasBiometricDenied key exists', async () => {
      await secureStorage.put(SecureKeys.hasBiometricDenied, 'denied');
      await service.setHasBiometricDenied();
      expect(service.hasBiometricDenied$.value).toBeTrue();
    });
  });
  describe('cleanBiometricIfNecessary & cleanBiometrics', () => {
    it('should call cleanBiometrics if biometric type is null and biometric is registered', async () => {
      service.biometricType$.next(null);
      service.hasBiometricRegistered$.next(true);
      spyOn(service, 'cleanBiometrics').and.returnValue(Promise.resolve());
      await service.cleanBiometricIfNecessary();
      expect(service.cleanBiometrics).toHaveBeenCalled();
    });
    it('cleanBiometrics should remove biometric key and update hasBiometricRegistered', async () => {
      await secureStorage.put(SecureKeys.biometric, BiometricType.Finger);
      await service.cleanBiometrics();
      const db = await secureStorage.getAll();
      expect(db[SecureKeys.biometric]).toEqual('');
    });
  });
  describe('presentBiometric', () => {
    it('should register secret and reattempt authentication for BIOMETRIC_NO_SECRET_FOUND when biometric not registered (simulate iOS)', async () => {
      const fakeError = { code: BiometricErrors.BIOMETRIC_NO_SECRET_FOUND };
      spyOn(fingerprintAIO, 'loadBiometricSecret').and.returnValue(
        Promise.reject(fakeError)
      );
      spyOn(fingerprintAIO, 'registerBiometricSecret').and.returnValue(
        Promise.resolve()
      );
      service.hasBiometricRegistered$.next(false);
      service.biometricType$.next(BiometricType.Finger);
      spyOn(Capacitor, 'getPlatform').and.returnValue('ios');
      await service.presentBiometric();
      expect(fingerprintAIO.registerBiometricSecret).toHaveBeenCalledWith({
        ...BiometricOptions[BiometricType.Finger],
        secret: jasmine.any(String)
      });
    });
    it('should call register secret when error code is BIOMETRIC_UNKNOWN_ERROR', async () => {
      const fakeError = { code: BiometricErrors.BIOMETRIC_UNKNOWN_ERROR };
      spyOn(fingerprintAIO, 'loadBiometricSecret').and.returnValue(
        Promise.reject(fakeError)
      );
      spyOn(fingerprintAIO, 'registerBiometricSecret').and.returnValue(
        Promise.resolve()
      );
      service.biometricType$.next(BiometricType.Finger);
      const result = await service.presentBiometric();
      expect(result).toBeUndefined();
      expect(fingerprintAIO.registerBiometricSecret).toHaveBeenCalled();
    });
  });
  describe('registerSecret', () => {
    it('should call registerBiometricSecret with proper parameters', async () => {
      spyOn(fingerprintAIO, 'registerBiometricSecret').and.returnValue(
        Promise.resolve()
      );
      await service.registerSecret(BiometricType.Finger);
      expect(fingerprintAIO.registerBiometricSecret).toHaveBeenCalledWith({
        ...BiometricOptions[BiometricType.Finger],
        secret: jasmine.any(String)
      });
    });
  });
  describe('useBiometric', () => {
    it('should return loginData when biometric is successful', async () => {
      const payload: LoginUserPayload = {
        typeDocument: 'id',
        document: '123',
        password: 'pass',
        deviceName: 'Device',
        deviceSerial: 'Serial'
      };
      await secureStorage.put(SecureKeys.loginData, JSON.stringify(payload));
      service.hasBiometricRegistered$.next(true);
      spyOn(service, 'presentBiometric').and.returnValue(
        Promise.resolve({ token: 'something' })
      );
      const result = await service.useBiometric();
      expect(result).toEqual(payload);
    });
    it('should return null when biometric is not registered', async () => {
      service.hasBiometricRegistered$.next(false);
      const result = await service.useBiometric();
      expect(result).toBeNull();
    });
  });
  describe('registerBiometric and onSaveBiometric (private)', () => {
    it('should register biometric when accepted', async () => {
      const payload: LoginUserPayload = {
        typeDocument: 'id',
        document: '12345',
        password: 'pass',
        deviceName: 'Device',
        deviceSerial: 'Serial'
      };
      spyOn(service, 'hasBiometricModalAllowed').and.returnValue(true);
      spyOn(service, 'presentBiometric').and.returnValue(
        Promise.resolve({ token: 'secret' })
      );
      await service.registerBiometric(payload);
      await (service as any).onSaveBiometric(true, payload);
      const db = await secureStorage.getAll();
      expect(db[SecureKeys.loginData]).toEqual(JSON.stringify(payload));
      expect(db[SecureKeys.biometric]).toEqual(jasmine.any(String));
    });
    it('should deny biometric registration when option is false', async () => {
      const payload: LoginUserPayload = {
        typeDocument: 'id',
        document: '12345',
        password: 'pass',
        deviceName: 'Device',
        deviceSerial: 'Serial'
      };
      spyOn(service, 'hasBiometricModalAllowed').and.returnValue(true);
      await (service as any).onSaveBiometric(false, payload);
      const db = await secureStorage.getAll();
      expect(db[SecureKeys.biometric]).toEqual('');
    });
  });
  describe('configureBiometric', () => {
    it('should return true when configuration succeeds', async () => {
      const payload: LoginUserPayload = {
        typeDocument: 'id',
        document: '123',
        password: 'pass',
        deviceName: 'Device',
        deviceSerial: 'Serial'
      };
      spyOnProperty(service, 'hasBiometric$', 'get').and.returnValue(of(true));
      spyOn(service, 'presentBiometric').and.returnValue(
        Promise.resolve({ token: 'something' })
      );
      const result = await service.configureBiometric(payload);
      expect(result).toBeTrue();
      const db = await secureStorage.getAll();
      expect(db[SecureKeys.loginData]).toEqual(JSON.stringify(payload));
      expect(db[SecureKeys.biometric]).toEqual(jasmine.any(String));
    });
    it('should return false when configuration fails', async () => {
      const payload: LoginUserPayload = {
        typeDocument: 'id',
        document: '123',
        password: 'pass',
        deviceName: 'Device',
        deviceSerial: 'Serial'
      };
      spyOnProperty(service, 'hasBiometric$', 'get').and.returnValue(of(true));
      spyOn(service, 'presentBiometric').and.returnValue(
        Promise.resolve({ error: -999 })
      );
      const result = await service.configureBiometric(payload);
      expect(result).toBeFalse();
    });
  });
  describe('updatePassword', () => {
    it('should update loginData in secure storage', async () => {
      const payload: LoginUserPayload = {
        typeDocument: 'id',
        document: '123',
        password: 'newPass',
        deviceName: 'Device',
        deviceSerial: 'Serial'
      };
      await service.updatePassword(payload);
      const db = await secureStorage.getAll();
      expect(db[SecureKeys.loginData]).toEqual(JSON.stringify(payload));
    });
  });
  describe('denyBiometrics and deactivateBiometrics', () => {
    it('denyBiometrics should set key hasBiometricDenied', async () => {
      await service.denyBiometrics();
      const db = await secureStorage.getAll();
      expect(db[SecureKeys.hasBiometricDenied]).toEqual('hasBiometricDenied');
    });
    it('deactivateBiometrics should call cleanBiometrics and denyBiometrics', async () => {
      spyOn(service, 'cleanBiometrics').and.returnValue(Promise.resolve());
      spyOn(service, 'denyBiometrics').and.returnValue(Promise.resolve());
      await service.deactivateBiometrics();
      expect(service.cleanBiometrics).toHaveBeenCalled();
      expect(service.denyBiometrics).toHaveBeenCalled();
    });
  });
  describe('getters', () => {
    it('hasBiometric$ should return true when biometricType is set', (done: DoneFn) => {
      service.biometricType$.next(BiometricType.Finger);
      service.hasBiometric$.subscribe((val) => {
        expect(val).toBeTrue();
        done();
      });
    });
    it('biometricText$ should return translated text', (done: DoneFn) => {
      service.biometricType$.next(BiometricType.Finger);
      service.biometricText$.subscribe((text) => {
        expect(text.includes('BIOMETRICS.TYPE.')).toBeTrue();
        done();
      });
    });
    it('biometricIconClass$ should return the proper icon class', (done: DoneFn) => {
      service.biometricType$.next(BiometricType.Face);
      service.biometricIconClass$.subscribe((iconClass) => {
        expect(iconClass).toEqual(BiometricIconClass[BiometricType.Face]);
        done();
      });
    });
  });
});
