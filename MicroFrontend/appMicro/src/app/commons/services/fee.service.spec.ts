import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { FeeService } from './fee.service';

describe('FeeService', () => {
  const setup = (): {
    service: FeeService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(FeeService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeeService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: FeeService = TestBed.inject(FeeService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchPaymentServices', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.base.fees);
    const mockData = {};
    const payload = {
      transactionId: 1234,
      accountId: '',
      accountType: ''
    };
    service.fetchCost(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
