import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  discardPeriodicTasks
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { QrAuthorizationPage } from './qr-authorization.page';
import { TestingModule } from '@testing/testing.module';
import { QrAuthorizationFacadeMock } from '@testing/mocks/facade/qr-authorization.facade.mock';
import { QrAuthorizationFacade } from '@modules/qr/pages/qr-authorization/qr-authorization.facade';
import { RouterTestingModule } from '@angular/router/testing';
import { SplitPipe } from '@commons/pipes/split.pipe';
import { SecondsFormatPipe } from '@modules/qr/pages/qr-authorization/pipes/seconds-format.pipe';
import { AdlSecureStorageService } from '@app/commons/services/adl-secure-storage.service';
import { OneSpanStorageItem } from '@avaldigitallabs/one-span-secure-storage';

describe('QrAuthorizationPage', () => {
  let component: QrAuthorizationPage;
  let fixture: ComponentFixture<QrAuthorizationPage>;
  let facade: QrAuthorizationFacadeMock;
  let modalController: jasmine.SpyObj<ModalController>;
  let secureStorage: jasmine.SpyObj<AdlSecureStorageService>;
  let route: any;

  beforeEach(waitForAsync(() => {
    spyOn(window, 'setInterval').and.returnValue(
      123 as unknown as NodeJS.Timeout
    );
    modalController = jasmine.createSpyObj('ModalController', ['create']);
    modalController.create.and.returnValue(
      Promise.resolve({
        present: () => Promise.resolve()
      } as any)
    );

    const mockStorageData: OneSpanStorageItem[] = [
      {
        key: 'login-data',
        value: JSON.stringify({ document: '12345' })
      }
    ];

    secureStorage = jasmine.createSpyObj('AdlSecureStorageService', ['getAll']);
    secureStorage.getAll.and.returnValue(Promise.resolve(mockStorageData));

    route = {
      queryParams: of({
        timestamp: new Date().toISOString(),
        token: 'test-token',
        txId: 'test-tx-id'
      })
    };

    TestBed.configureTestingModule({
      declarations: [QrAuthorizationPage, SplitPipe, SecondsFormatPipe],
      imports: [IonicModule, TestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: QrAuthorizationFacade,
          useClass: QrAuthorizationFacadeMock
        },
        { provide: ModalController, useValue: modalController },
        { provide: AdlSecureStorageService, useValue: secureStorage },
        { provide: ActivatedRoute, useValue: route }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(QrAuthorizationPage);
    component = fixture.componentInstance;
    facade = TestBed.inject(
      QrAuthorizationFacade
    ) as unknown as QrAuthorizationFacadeMock;
    spyOnProperty(component, 'decryptedData$', 'get').and.returnValue(of(['']));
    spyOnProperty(
      component,
      'qrAuthorizationMaxOtpTime',
      'get'
    ).and.returnValue(2);
    fixture.detectChanges();
  }));

  afterEach(() => {
    if (component.timer) {
      clearInterval(component.timer);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined completed$', () => {
    expect(component.completed$).toBeDefined();
  });

  it('should qrAuthorizationMaxOtpTime', () => {
    expect(component.qrAuthorizationMaxOtpTime).toEqual(2);
  });

  it('should transactionTitle$', () => {
    expect(component.transactionTitle$).toBeDefined();
  });

  it('should decryptedData$', () => {
    expect(component.decryptedData$).toBeDefined();
  });

  it('should dynamicCode$', () => {
    expect(component.dynamicCode$).toBeDefined();
  });

  it('should working$', () => {
    expect(component.working$).toBeDefined();
  });

  it('should completed$', () => {
    expect(component.completed$).toBeDefined();
  });

  describe('Lifecycle methods', () => {
    it('should initialize countdown on ngOnInit', fakeAsync(() => {
      component.ngOnInit();
      tick(1000);
      discardPeriodicTasks();
      expect(component.timeValue).toBeDefined();
      expect(component.counter).toBeDefined();
    }));

    it('should cleanup on ngOnDestroy', fakeAsync(() => {
      const clearIntervalSpy = spyOn(window, 'clearInterval');
      component.ngOnInit();
      tick(1000);
      component.timer = setInterval(() => null, 1000);

      component.ngOnDestroy();
      tick();

      expect(clearIntervalSpy).toHaveBeenCalled();
      discardPeriodicTasks();
    }));
  });

  describe('Timer functionality', () => {
    it('should update timeValue correctly', fakeAsync(() => {
      const futureTime = Date.now() + 10000;
      component.timeStamp = futureTime;

      component['updateTimeValue']();
      tick();

      expect(component.timeValue).toBeGreaterThan(0);
      expect(component.timeValue).toBeLessThanOrEqual(10);
      discardPeriodicTasks();
    }));
  });

  describe('Token handling', () => {
    it('should handle error in token processing', fakeAsync(() => {
      secureStorage.getAll.and.returnValue(Promise.reject('Test error'));
      const consoleSpy = spyOn(console, 'error');

      component['handleToken']();
      tick();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching data:',
        'Test error'
      );
      discardPeriodicTasks();
    }));
  });
});
