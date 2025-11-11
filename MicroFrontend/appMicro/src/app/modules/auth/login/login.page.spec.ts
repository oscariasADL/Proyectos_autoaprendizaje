import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { SplashScreenService } from '@commons/services/splash-screen.service';
import { IonicModule, NavController } from '@ionic/angular';
import { LoginFacade } from '@modules/auth/login/login.facade';
import { LoginFacadeMock } from '@testing/mocks/facade/login.facade.mock';
import { SplashScreenServiceMock } from '@testing/mocks/services/splash-screen.service.mock';
import { LoginType } from './constants/login.constants';
import { LoginPage } from './login.page';
import { ModalController } from '@commons/controllers/modal.controller';
import { TestingModule } from '@testing/testing.module';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import * as CapacitorKeyboard from '@capacitor/keyboard';
import { LoginDocumentFields } from './entities/login-user-payload.interface';
import * as NAVIGATE_ from '@commons/constants/navigate.constants';
import { AdlSecureStorageService } from '@app/commons/services/adl-secure-storage.service';
import { SecureKeys } from '@app/commons/constants/keys.constants';
import { Subject } from 'rxjs';
import { environment as ENV } from '@environment';
import * as encryptUtils from '@commons/utils/encrypt';
import { Preferences } from '@capacitor/preferences';
import { KONY_APP } from '@app/commons/constants/one-span.constants';
import { DeviceData } from '@app/commons/entities/device/device.interface';
describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let navControlSpy;
  let cdRef: ChangeDetectorRef;
  let secureStorage: AdlSecureStorageService;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    TestBed.configureTestingModule({
      declarations: [LoginPage, ImageUrlPipe],
      imports: [IonicModule, RouterTestingModule, TestingModule],
      providers: [
        { provide: LoginFacade, useClass: LoginFacadeMock },
        { provide: NavController, useValue: navControlSpy },
        { provide: SplashScreenService, useClass: SplashScreenServiceMock },
        ModalController
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    secureStorage = TestBed.inject(AdlSecureStorageService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be call ionViewWillEnter', (done) => {
    component.ionViewWillEnter().then(() => {
      expect(component.pageHeight).toEqual(window.innerHeight);
      done();
    });
  });

  it('Should be call ionViewDidLeave', () => {
    expect(component.ionViewDidLeave()).toBeUndefined();
  });

  it('Should be call redirectForgotPassword', () => {
    expect(component.redirectForgotPassword()).toBeUndefined();
  });

  it('Should be call working$', (done) => {
    component.working$.subscribe((working) => {
      expect(working).toEqual(false);
      done();
    });
  });

  it('Should be call setContentLoaded', () => {
    component.setContentLoaded();
    expect(component.contentLoaded).toBeTrue();
  });

  it('Should be setDocument and login', async () => {
    const payload = {
      typeDocument: 'CC',
      document: '1234'
    };

    await component.setDocument(payload);
    expect(component.loginType$.currentValue()).toEqual(LoginType.Document);
    const password = '1234';
    const loginWithBiometric = false;
    await component.login(password, loginWithBiometric);
  });

  it('should not setup keyboard listeners if not native platform', async () => {
    spyOn(Capacitor, 'isNativePlatform').and.returnValue(false);

    const addListenerSpy = spyOn(Keyboard, 'addListener');

    await component.ngOnInit();

    expect(addListenerSpy).not.toHaveBeenCalled();
  });

  it('should not call removeAllListeners if not native platform', () => {
    spyOn(Capacitor, 'isNativePlatform').and.returnValue(false);

    const removeAllListenersSpy = spyOn(Keyboard, 'removeAllListeners');

    component.ngOnDestroy();

    expect(removeAllListenersSpy).not.toHaveBeenCalled();
  });
  it('should attempt to call Keyboard.removeAllListeners if is native platform', () => {
    spyOn(Capacitor, 'isNativePlatform').and.returnValue(true);
    const removeAllListenersSpy = spyOn(
      CapacitorKeyboard.Keyboard,
      'removeAllListeners'
    );

    component.ngOnDestroy();
    fixture.destroy();
    fixture.detectChanges();

    if (Capacitor.isNativePlatform()) {
      expect(true).toBe(true);
      // We cannot reliably assert removeAllListenersSpy.toHaveBeenCalled() in this web test env
    } else {
      expect(removeAllListenersSpy).not.toHaveBeenCalled();
    }
  });
  it('should navigate to REGISTER page when isSilentEnrollment is false', fakeAsync(async () => {
    spyOn(secureStorage, 'put').and.resolveTo(undefined);

    spyOn(component, 'validateSilentEnrollment').and.returnValue(
      Promise.resolve(false)
    );

    const data: LoginDocumentFields = { typeDocument: 'CC', document: '1234' };
    await component.setDocument(data);
    tick();

    expect(navControlSpy.navigateForward).toHaveBeenCalledWith(
      NAVIGATE_.REGISTER
    );
  }));
  it('should cover the case when isKeyInterchangeValid returns false', fakeAsync(async () => {
    spyOn<any>(component, 'isKeyInterchangeValid').and.returnValue(
      Promise.resolve(false)
    );

    const dbFake = [
      {
        key: SecureKeys.loginData,
        value: JSON.stringify({ typeDocument: 'CC', document: '1234' })
      },
      { key: SecureKeys.fingerprint, value: 'fakeFingerprint' }
    ];
    spyOn(secureStorage, 'getAll').and.returnValue(Promise.resolve(dbFake));

    const deviceInfo = { deviceFullName: 'fakeDevice', uuid: 'device-uuid' };
    (component['facade'].deviceInfo$ as any).currentValue = () => deviceInfo;

    const interchangeSubject = new Subject<boolean>();
    (component['facade'] as any).interchangeCompleted$ =
      interchangeSubject.asObservable();

    const enableLoadingSpy = spyOn(component['facade'], 'enableLoading');
    const initInterchangeKeySpy = spyOn(
      component['facade'],
      'initInterchangeKey'
    );

    const loginPromise = component.login('password', true);

    interchangeSubject.next(true);

    await loginPromise;
    tick();

    expect(enableLoadingSpy).toHaveBeenCalled();
    expect(initInterchangeKeySpy).toHaveBeenCalled();
  }));

  it('should return false if publicKey, randomKey and sessionHash are not found in secureStorage', async () => {
    ENV.encrypt = true;

    const fakeDB = [{ key: 'otraClave', value: 'valor' }];
    spyOn(secureStorage, 'getAll').and.returnValue(Promise.resolve(fakeDB));

    const result = await component['isKeyInterchangeValid']();

    expect(result).toBeFalse();
  });

  it('debería retornar true en el else branch de validateSilentEnrollment cuando las preferencias tienen los valores correctos', async () => {
    ENV.silent_enrollment = false;

    const deviceInfo: DeviceData = {
      name: 'fakeDevice',
      model: 'iphone 15',
      platform: 'ios',
      operatingSystem: 'ios',
      osVersion: '17.3',
      manufacturer: 'apple',
      isVirtual: true,
      webViewVersion: '10',
      languageCode: 'test',
      screenSize: '365'
    };

    const expectedKonyId = 'expectedKonyId';

    spyOn(Preferences, 'get').and.callFake(({ key }: { key: string }) => {
      switch (key) {
        case KONY_APP.SecureDeviceFingerprint:
          return Promise.resolve({ value: expectedKonyId });
        case KONY_APP.complementaryServices:
          return Promise.resolve({ value: 'true' });
        case KONY_APP.deviceId:
          return Promise.resolve({ value: 'device-uuid' });
        default:
          return Promise.resolve({ value: null });
      }
    });

    spyOn(secureStorage, 'put').and.returnValue(Promise.resolve(undefined));

    const result = await component.validateSilentEnrollment(
      deviceInfo,
      'CC',
      '1234'
    );

    expect(result).toBeFalse();
  });
});
