import { TestBed } from '@angular/core/testing';
import { LoginDeepLinkService } from './login-deep-link.service';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AlertService } from '@commons/services/alert.service';
import { AppFacade } from '@app/app.facade';
import { Device } from '@capacitor/device';
import { SecureKeys } from '@commons/constants/keys.constants';
import {
  INIT_LOGIN_DEEP_LINK_ALERT,
  ALLOWED_URLS_FOR_DEEPLINK
} from '@commons/constants/wallets.constants';
import { URLOpenListenerEvent } from '@capacitor/app';

describe('LoginDeepLinkService', () => {
  let service: LoginDeepLinkService;
  let storageSpy: jasmine.SpyObj<AdlSecureStorageService>;
  let alertSpy: jasmine.SpyObj<AlertService>;
  let facadeSpy: jasmine.SpyObj<AppFacade>;

  beforeEach(() => {
    const storageMock = jasmine.createSpyObj('AdlSecureStorageService', [
      'getAll',
      'put'
    ]);
    const alertMock = jasmine.createSpyObj('AlertService', ['create']);
    const facadeMock = jasmine.createSpyObj('AppFacade', ['logout']);

    TestBed.configureTestingModule({
      providers: [
        LoginDeepLinkService,
        { provide: AdlSecureStorageService, useValue: storageMock },
        { provide: AlertService, useValue: alertMock },
        { provide: AppFacade, useValue: facadeMock }
      ]
    });

    service = TestBed.inject(LoginDeepLinkService);
    storageSpy = TestBed.inject(
      AdlSecureStorageService
    ) as jasmine.SpyObj<AdlSecureStorageService>;
    alertSpy = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
    facadeSpy = TestBed.inject(AppFacade) as jasmine.SpyObj<AppFacade>;
  });

  describe('validateLoginWithDeepLink', () => {
    const validUrl = ALLOWED_URLS_FOR_DEEPLINK[0];
    const invalidUrl = 'https://ejemplo.com/otro';
    const eventValid: URLOpenListenerEvent = { url: validUrl };
    const eventInvalid: URLOpenListenerEvent = { url: invalidUrl };

    beforeEach(() => {
      alertSpy.create.calls.reset();
      storageSpy.put.calls.reset();
      facadeSpy.logout.calls.reset();
    });

    it('Should run setLoginDeepLink, initLoginDeepLink and logout if the platform is iOS and the URL is valid', async () => {
      service['platforms'].push('web' as any);

      await service.validateLoginWithDeepLink(eventValid);

      expect(storageSpy.put).toHaveBeenCalled();

      expect(alertSpy.create).toHaveBeenCalledWith(INIT_LOGIN_DEEP_LINK_ALERT);

      expect(facadeSpy.logout).toHaveBeenCalledWith(true, false);
    });

    it('should do nothing if the URL is invalid', async () => {
      spyOn(Device, 'getInfo').and.resolveTo({ platform: 'ios' } as any);

      await service.validateLoginWithDeepLink(eventInvalid);

      expect(storageSpy.put).not.toHaveBeenCalled();
      expect(alertSpy.create).not.toHaveBeenCalled();
      expect(facadeSpy.logout).not.toHaveBeenCalled();
    });

    it('should not do anything if the platform is not the right one', async () => {
      spyOn(Device, 'getInfo').and.resolveTo({ platform: 'android' } as any);

      await service.validateLoginWithDeepLink(eventValid);

      expect(storageSpy.put).not.toHaveBeenCalled();
      expect(alertSpy.create).not.toHaveBeenCalled();
      expect(facadeSpy.logout).not.toHaveBeenCalled();
    });
  });

  describe('isLoginDeepLink', () => {
    it('should return true if openFromDeepLink has a value in the storage', async () => {
      const fakeDB = [{ key: SecureKeys.openFromDeepLink, value: 'true' }];
      storageSpy.getAll.and.resolveTo(fakeDB);

      const result = await service.isLoginDeepLink();
      expect(result).toBeTrue();
      expect(storageSpy.getAll).toHaveBeenCalled();
    });

    it('should return false if openFromDeepLink is null, undefined or empty', async () => {
      const fakeDB = [];
      storageSpy.getAll.and.resolveTo(fakeDB);

      const result = await service.isLoginDeepLink();
      expect(result).toBeFalse();
      expect(storageSpy.getAll).toHaveBeenCalled();
    });
  });
});
