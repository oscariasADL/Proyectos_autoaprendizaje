import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { CreditMovementsService } from './credit-movements.service';

describe('CreditMovementsService', () => {
  const setup = (): {
    service: CreditMovementsService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(CreditMovementsService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CreditMovementsService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: CreditMovementsService = TestBed.inject(
      CreditMovementsService
    );
    expect(service).toBeTruthy();
  });

  it('should to call fetchPayments', () => {
    const { service, httpTestingController } = setup();
    const productId = '123';
    const url = urlBuilder.services(ENV.api.services.payments.payments_list, {
      product_id: productId
    });
    const mockData = {};
    service.fetchPayments(productId).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call directPayment', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.payments.directed_payment_multiple
    );
    const mockData = {};
    const payload = null;
    service.directPayment(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call updateInstallment', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.payments.update_installments
    );
    const mockData = {};
    const payload = null;
    service.updateInstallment(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('PUT');
  });
});
