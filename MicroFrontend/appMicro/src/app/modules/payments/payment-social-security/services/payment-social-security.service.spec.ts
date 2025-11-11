import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { PaymentSocialSecurityService } from './payment-social-security.service';

describe('PaymentSocialSecurityService', () => {
  const setup = (): {
    service: PaymentSocialSecurityService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(PaymentSocialSecurityService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentSocialSecurityService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: PaymentSocialSecurityService = TestBed.inject(
      PaymentSocialSecurityService
    );
    expect(service).toBeTruthy();
  });

  it('should to call fetchContributors', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.bills.social_security);
    const mockData = {};
    service.fetchContributors().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call paySocialSecurity', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.bills.social_security);
    const mockData = {};
    service.paySocialSecurity(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call fetchSocialSecurityDataByReference', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.bills.search_bill_reference
    );
    const mockData = {};
    service.fetchSocialSecurityDataByReference(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
