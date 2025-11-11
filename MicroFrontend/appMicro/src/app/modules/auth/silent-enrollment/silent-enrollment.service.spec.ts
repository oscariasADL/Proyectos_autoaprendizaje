import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { SilentEnrollmentService } from './silent-enrollment.service';

describe('SilentEnrollmentService', () => {
  const setup = (): {
    service: SilentEnrollmentService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(SilentEnrollmentService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SilentEnrollmentService]
    })
  );

  it('should be created', () => {
    const service: SilentEnrollmentService = TestBed.inject(
      SilentEnrollmentService
    );
    expect(service).toBeTruthy();
  });

  it('should to call runSilentEnrollment', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.enrollment.silent);
    const mockData = {
      processId: 'fe707d25-e467-11e9-95dc-0242ac110003',
      step: 'MIG08',
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
    service.runSilentEnrollment(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
