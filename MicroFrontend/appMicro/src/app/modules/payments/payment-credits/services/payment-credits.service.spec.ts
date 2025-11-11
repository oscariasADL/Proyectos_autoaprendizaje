import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { PaymentFetchFilter } from '../entities/payment-credits.interface';
import { PaymentCreditsService } from './payment-credits.service';

describe('PaymentCreditsService', () => {
  const setup = (): {
    service: PaymentCreditsService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(PaymentCreditsService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentCreditsService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: PaymentCreditsService = TestBed.inject(
      PaymentCreditsService
    );
    expect(service).toBeTruthy();
  });

  it('should to call fetchPaymentCredits', () => {
    const { service, httpTestingController } = setup();
    const option = PaymentFetchFilter.OWN;
    let url = urlBuilder.services(ENV.api.services.payments.loans);
    url += '?own=' + option;
    const mockData = {};
    service.fetchPaymentCredits(option).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call pay', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.payments.loans_pay);
    const mockData = {};
    service.pay(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
