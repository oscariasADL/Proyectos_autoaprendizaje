import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { ForgotPasswordService } from './forgot-password.service';

describe('ForgotPasswordService', () => {
  const setup = (): {
    service: ForgotPasswordService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(ForgotPasswordService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ForgotPasswordService]
    });
  });

  it('should be created', () => {
    const service: ForgotPasswordService = TestBed.inject(
      ForgotPasswordService
    );
    expect(service).toBeTruthy();
  });

  it('should to call runForgotPassword', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.management.forgot_password
    );
    const mockData = {
      processId: '7457d552-f748-11e9-8a77-0242ac110002',
      step: 'CHA08',
      secureDataBriefQuestion: {
        length: 8,
        question:
          'Ingresa los ultimos 8 digitos de alguna de tus Tarjetas Credito Master                                                  ',
        accountType: 'CCA',
        questionType: 'product',
        productType: 'CREDIT_CARD'
      },
      sdsPasswordValidation: 'MB',
      userFirstName: 'ANGIE',
      challenged: false,
      finished: false,
      success: true
    };
    const payload = null;
    service
      .getForgotPasswordData(payload, {
        isBiometrics: false,
        isEnabledBavvExecutorSF: false
      })
      .subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
