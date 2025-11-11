import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { UpdatePlatform } from '../entities/new-update/new-update.interface';
import { AdlSecureStorageService } from './adl-secure-storage.service';
import { NewAppUpdateService } from './new-app-update.service';
import { OnboardingService } from './onboarding.service';
import { ParameterService } from './parameter.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NEW_APP_UPDATE } from '../constants/navigate.constants';
import { Capacitor } from '@capacitor/core';
import { AppPlugin } from '../native-plugins/AppPlugin';
import { AppInfo } from '@capacitor/app';

describe('NewAppUpdateService', () => {
  let service: NewAppUpdateService;
  let navControlSpy;
  let parameterServiceSpy;

  beforeEach(() => {
    navControlSpy = jasmine.createSpyObj('NavController', ['navigateRoot']);
    parameterServiceSpy = jasmine.createSpyObj('ParameterService', [
      'fetchParameter'
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NewAppUpdateService,
        OnboardingService,
        AdlSecureStorageService,
        { provide: NavController, useValue: navControlSpy },
        { provide: ParameterService, useValue: parameterServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(NewAppUpdateService);
    (service as any).currentVersion = {
      appVersion: '2',
      isMandatoryUpdate: 'true',
      mandatoryUpdatePlatform: UpdatePlatform.BOTH
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call skipOptionalUpdate', async () => {
    try {
      await service.skipOptionalUpdate();
      expect(service.skipOptionalUpdate).toBeDefined();
    } catch (error) {
      fail(`skipOptionalUpdate threw an error: ${error}`);
    }
  });

  it('should return isMandatoryUpdate', () => {
    expect(service.isMandatoryUpdate).toBeTruthy();
  });

  it('should call checkMustUpdate', async () => {
    try {
      (service as any).currentVersion = {
        appVersion: '2',
        isMandatoryUpdate: 'true',
        mandatoryUpdatePlatform: UpdatePlatform.BOTH
      };
      const result = await (service as any).checkMustUpdate('1', [
        {
          appVersion: '2',
          isMandatoryUpdate: 'true',
          platform: UpdatePlatform.BOTH
        },
        {
          appVersion: '1',
          isMandatoryUpdate: 'false',
          platform: UpdatePlatform.BOTH
        }
      ]);
      expect(result).toBeTruthy();
    } catch (error) {
      fail(`checkMustUpdate threw an error: ${error}`);
    }
  });

  it('should call checkNewAppUpdate', async () => {
    parameterServiceSpy.fetchParameter.and.callFake(() =>
      of([
        {
          appVersion: '2',
          isMandatoryUpdate: 'true',
          mandatoryUpdatePlatform: UpdatePlatform.BOTH
        },
        {
          appVersion: '1',
          isMandatoryUpdate: 'false',
          mandatoryUpdatePlatform: UpdatePlatform.BOTH
        }
      ])
    );
    try {
      const result = await service.checkNewAppUpdate();
      expect(result).toBeFalse();
    } catch (error) {
      fail(`checkNewAppUpdate threw an error: ${error}`);
    }
  });
  it('should navigate to the update screen when not on a native platform and update is required', async () => {
    spyOn(Capacitor, 'isNativePlatform').and.returnValue(true);
    const appInfo: AppInfo = {
      name: 'TestApp',
      id: 'com.test.app',
      build: '100',
      version: '1.0.0'
    };
    spyOn(AppPlugin, 'getInfo').and.returnValue(Promise.resolve(appInfo));
    const secureStorage = TestBed.inject(AdlSecureStorageService);
    spyOn(secureStorage, 'getAll').and.returnValue(Promise.resolve([]));
    parameterServiceSpy.fetchParameter.and.returnValue(
      of([
        {
          appVersion: '1.0.0',
          isMandatoryUpdate: 'true',
          platform: UpdatePlatform.BOTH
        },
        {
          appVersion: '0.9.0',
          isMandatoryUpdate: 'false',
          platform: UpdatePlatform.BOTH
        }
      ])
    );
    const result = await service.checkNewAppUpdate();
    expect(navControlSpy.navigateRoot).toHaveBeenCalledWith(NEW_APP_UPDATE);
    expect(result).toBeTrue();
  });
  it('should return false when the provided platform is not BOTH and does not match the current platform', () => {
    const updateParameter = {
      appVersion: '1.0.0',
      isMandatoryUpdate: 'false',
      platform: 'IOS' // This is not "BOTH"
    };
    spyOn(Capacitor, 'getPlatform').and.returnValue('android');
    const result = (service as any).isPlatformToUpdate(updateParameter);
    expect(result).toBeFalse();
  });
});
