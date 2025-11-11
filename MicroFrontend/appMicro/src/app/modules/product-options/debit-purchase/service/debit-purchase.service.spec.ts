import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { DEBIT_PURCHASE_INSTALLMENTS_TYPE } from '@modules/product-options/debit-purchase/constants/debit-purchase.constants';
import { DebitPurchaseService } from './debit-purchase.service';

describe('DebitPurchaseService', () => {
  const setup = (): {
    service: DebitPurchaseService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(DebitPurchaseService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DebitPurchaseService]
    })
  );

  it('should be created', () => {
    const service: DebitPurchaseService = TestBed.inject(DebitPurchaseService);
    expect(service).toBeTruthy();
  });

  it('should to call debitPurchase', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.payments.debt_purchase);
    const mockData = {};
    const payload = {
      productOrigin: {
        accountType: '',
        accountId: ''
      },
      productTarget: {
        accountType: '',
        accountId: '',
        bankId: ''
      },
      amount: 10000
    };
    service.debitPurchase(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call getLOCInstallments', () => {
    const { service, httpTestingController } = setup();
    const account_id = '1234';
    const url =
      urlBuilder.services(ENV.api.services.payments.installments, {
        account_id
      }) +
      '?type=' +
      DEBIT_PURCHASE_INSTALLMENTS_TYPE;
    const mockData = {};
    service.getLOCInstallments(account_id).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call getRates', () => {
    const { service, httpTestingController } = setup();
    const productId = '123';
    const url = urlBuilder.services(
      ENV.api.services.payments.debt_purchase_rate,
      { relative_id: productId }
    );
    const mockData = {
      annualRate: '',
      monthRate: ''
    };
    service.getRates(productId).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });
});
