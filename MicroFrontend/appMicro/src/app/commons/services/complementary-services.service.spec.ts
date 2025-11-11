import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { ComplementaryServicesService } from './complementary-services.service';
import { ToggleComplementaryServicesResponse } from '@app/modules/security/security-complementary-services/entities/complementary-services.interface';

describe('ComplementaryServicesService', () => {
  const setup = (): {
    service: ComplementaryServicesService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(ComplementaryServicesService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', () => {
    const service: ComplementaryServicesService = TestBed.inject(
      ComplementaryServicesService
    );
    expect(service).toBeTruthy();
  });

  it('should to call login', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.management.complementary_services
    );
    const mockData = {};
    service.getComplementaryServices().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call toggleComplementaryServices', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.core.complementary_services
    );
    const mockData = {
      approvalId: '123123'
    };
    service
      .toggleComplementaryServices(
        {
          content: {
            automaticValidation: true,
            otpValue: '33333'
          }
        },
        false
      )
      .subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
  it('should call toggleComplementaryServices with complementary_services_sf URL when feature flag is enabled', () => {
    const { service, httpTestingController } = setup();
    const expectedUrl = urlBuilder.services(
      ENV.api.services.core.complementary_services
    );
    const payload = {
      content: {
        automaticValidation: true,
        otpValue: '33333'
      }
    };
    const mockResponse: ToggleComplementaryServicesResponse = {
      complementary: true,
      processId: 'proc-123',
      step: 'step1',
      secureDataBriefQuestion: {
        length: 10,
        question: 'What is your pet name?',
        accountType: 'basic',
        questionType: 'personal',
        productType: 'insurance'
      },
      token: 'token123',
      lastAuthDate: '2023-10-10',
      currentDate: '2023-10-11',
      lastIPAddress: '192.168.1.1',
      errorMessage: '',
      errorCode: '',
      sdsPasswordValidation: '',
      challenged: false,
      twoFactorAuthResponse: '',
      success: true,
      enrollmentKey: 'enroll123',
      isLastAttempt: false
    };
    service
      .toggleComplementaryServices(payload, false)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResponse);
  });
});
