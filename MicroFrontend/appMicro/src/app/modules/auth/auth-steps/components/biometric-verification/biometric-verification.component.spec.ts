import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BiometricVerificationComponent } from './biometric-verification.component';
import { CustomEventService } from '@commons/services/custom-events.service';
import { AppFacade } from '@app/app.facade';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';
import { TestingModule } from '@testing/testing.module';
import {
  BIOMETRICS_TOPICS,
  BIOMETRIC_VERIFICATION_STATUS
} from './constants/biometrics.constants';
import { DeviceData } from '@app/commons/entities/device/device.interface';
import { AuthStepsFacade } from '../../auth-steps.facade';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import {
  OutputResponse,
  OutputResponseOverflow
} from './constants/biometrics.interface';
import { ActivatedRoute } from '@angular/router';
import { AuthStepType } from '@modules/auth/auth-steps/entities/auth-steps.interface';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';

describe('BiometricVerificationComponent', () => {
  let component: BiometricVerificationComponent;
  let fixture: ComponentFixture<BiometricVerificationComponent>;
  let customEventServiceSpy: jasmine.SpyObj<CustomEventService>;
  let facadeSpy: jasmine.SpyObj<AppFacade>;

  const deviceInfoMock: DeviceData = {
    uuid: 'test-uuid',
    languageCode: '',
    screenSize: '',
    model: '',
    platform: 'ios',
    operatingSystem: 'ios',
    osVersion: '',
    manufacturer: '',
    isVirtual: false,
    webViewVersion: ''
  };

  const outputResponseMock: OutputResponse = {
    topicName: 'OutputResponse',
    topicValue: {
      data: {
        message: BIOMETRIC_VERIFICATION_STATUS.SUCCESS,
        detail: '',
        messageCode: 'NSA11'
      },
      processId: '1213',
      biometricToken: '1233455',
      dataCustomer: {
        documentType: 'CC',
        identificationNumber: 1019100206
      }
    },
    eventDriven: 2
  };

  const outputResponseOverflowMock: OutputResponseOverflow = {
    topicName: 'OutputResponse',
    topicValue: {
      data: {
        message: BIOMETRIC_VERIFICATION_STATUS.ERROR,
        detail: '',
        messageCode: ''
      }
    },
    eventDriven: 0
  };

  beforeEach(waitForAsync(() => {
    customEventServiceSpy = jasmine.createSpyObj('CustomEventService', [
      'publishCustomEvent',
      'clearStoredEvent',
      'subscribeToCustomEvent'
    ]);

    facadeSpy = jasmine.createSpyObj('AppFacade', ['deviceInfo$']);

    TestBed.configureTestingModule({
      imports: [
        IonicModule,
        ReactiveFormsModule,
        RouterTestingModule,
        TestingModule,
        BiometricVerificationComponent
      ],
      providers: [
        { provide: CustomEventService, useValue: customEventServiceSpy },
        { provide: AppFacade, useValue: facadeSpy },
        { provide: AuthStepsFacade, useValue: AuthStepsFacadeMock },
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                data: {
                  data: { title: '' },
                  method: () => {
                    return;
                  },
                  type: AuthStepType.register
                }
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BiometricVerificationComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call clearStoredEvent on ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(customEventServiceSpy.clearStoredEvent).toHaveBeenCalled();
  });

  it('should initialize device data on ngOnInit', () => {
    facadeSpy.deviceInfo$ = of(deviceInfoMock);
    customEventServiceSpy.subscribeToCustomEvent.and.returnValue(new Subject());

    component.ngOnInit();

    expect(component['uuid']).toBe('test-uuid');
  });

  it('should handle biometric success event', () => {
    const successSubject = new Subject<any>();
    customEventServiceSpy.subscribeToCustomEvent.and.callFake((topic) => {
      return topic === BIOMETRICS_TOPICS.OUTPUT_RESPONSE
        ? successSubject
        : new Subject();
    });

    spyOn(component as any, 'handleBiometricSuccess');

    facadeSpy.deviceInfo$ = of(deviceInfoMock);
    component.ngOnInit();

    successSubject.next(outputResponseMock);

    expect((component as any).handleBiometricSuccess).toHaveBeenCalledWith({
      biometricProcessId: outputResponseMock.topicValue.processId,
      biometricToken: outputResponseMock.topicValue.biometricToken,
      messageCode: outputResponseMock.topicValue.data.messageCode
    });
  });

  it('should handle biometric error event', () => {
    const errorSubject = new Subject<any>();
    customEventServiceSpy.subscribeToCustomEvent.and.callFake((topic) => {
      return topic === BIOMETRICS_TOPICS.OUTPUT_RESPONSE_OVERFLOW
        ? errorSubject
        : new Subject();
    });

    spyOn(component as any, 'handleBiometricFailed');

    facadeSpy.deviceInfo$ = of(deviceInfoMock);
    component.ngOnInit();

    errorSubject.next(outputResponseOverflowMock);

    expect((component as any).handleBiometricFailed).toHaveBeenCalled();
  });
});
