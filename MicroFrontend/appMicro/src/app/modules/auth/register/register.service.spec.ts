import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  const mockData = {
    processId: 'fe707d25-e467-11e9-95dc-0242ac110003',
    step: 'ENR05',
    secureDataBriefQuestion: null,
    userFirstName: 'Pepito',
    token: 'eyJraWQiOiJ',
    lastAuthDate: '2018-02-16T17:00:00Z',
    currentDate: '2019-10-01T16:31:35Z',
    lastIPAddress: '127.0.0.1',
    errorMessage: null,
    sdsPasswordValidation: null,
    challenged: false,
    twoFactorAuthResponse: null,
    success: true
  };
  const setup = (): {
    service: RegisterService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(RegisterService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    return { service, httpTestingController };
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService]
    });
  });

  it('should be created', () => {
    const service: RegisterService = TestBed.inject(RegisterService);
    expect(service).toBeTruthy();
  });

  it('should to call runRegistration', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.enrollment.base);

    service
      .getRegisterDataByEnrollmentTypeAndExecutorSF(null, false, false)
      .subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call runRegistration with step functions', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.enrollment.base_sf);

    service
      .getRegisterDataByEnrollmentTypeAndExecutorSF(null, true, false)
      .subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call runRegistration with step functions and biometrics', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.enrollment.biometrics_sf);

    service
      .getRegisterDataByEnrollmentTypeAndExecutorSF(null, true, true)
      .subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call runRegistration with  biometrics', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.enrollment.biometrics);

    service
      .getRegisterDataByEnrollmentTypeAndExecutorSF(null, false, true)
      .subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
