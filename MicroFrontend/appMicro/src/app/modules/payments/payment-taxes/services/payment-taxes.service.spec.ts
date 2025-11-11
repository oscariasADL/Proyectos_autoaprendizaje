import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { TypeAccount } from '@commons/entities/product/type-account';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import {
  AgreementTaxes,
  PaymentsReferenceValueRequest,
  PaymentTaxesRequest
} from '../entities/payment-taxes.interface';
import { PaymentTaxesService } from './payment-taxes.service';
import {
  SearchBillBarcodePayload,
  SearchBillBarcodeResponse
} from '../../payment-services/entities/register-service.interface';

describe('PaymentTaxesService', () => {
  const setup = (): {
    service: PaymentTaxesService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(PaymentTaxesService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentTaxesService]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: PaymentTaxesService = TestBed.inject(PaymentTaxesService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchAgreementsByCity', () => {
    const { service, httpTestingController } = setup();
    let url = urlBuilder.services(ENV.api.services.taxes.tax_agreements);
    url += '?cityCode=11001';

    const mockData = {};
    service.fetchAgreementsByCity('11001').subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchCities', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.taxes.tax_cities);
    const mockData = {};
    service.fetchCities().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchValueFromAgreement', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.taxes.tax_detail);
    const mockData = {
      invoiceNumber: '123',
      amount: '10000',
      currency: 'COP',
      maxPaymentDate: '2020-02-02',
      organizationId: '1',
      referenceId: '123',
      amountType: '1'
    };
    const payload: PaymentsReferenceValueRequest = {
      agreement: '123',
      reference: '123'
    };
    service.fetchAgreementDetail(payload).subscribe((data) => {
      expect(data.body.invoiceNumber).toEqual(mockData.invoiceNumber);
    });
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call paymentTax', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.taxes.tax_payment);
    const mockData = {
      approvalId: '123',
      code: '0',
      description: 'Success',
      transactionDate: '2020-01-01'
    };

    const payload: PaymentTaxesRequest = {
      productOrigin: {
        accountType: TypeAccount.SDA,
        accountId: '123'
      },
      cityId: '123',
      referenceId: '123',
      invoiceNumber: '123',
      amount: '10000',
      organizationId: '1',
      amountType: '1'
    };
    service.paymentTax(payload).subscribe((data) => {
      expect(data.approvalId).toEqual(mockData.approvalId);
    });
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
  it('should call fetchAgreementByCode and return expected data', () => {
    const { service, httpTestingController } = setup();

    const url =
      urlBuilder.services(ENV.api.services.taxes.tax_agreementDetail) +
      '?code=123';

    const mockData: AgreementTaxes = {
      code: '123',
      name: 'Sample Agreement',
      expectedReferenceDescription: 'Description of the agreement',
      additionalInfo: [''],
      cityInfo: {
        code: '123',
        name: 'testName'
      }
    };

    service.fetchAgreementByCode('123').subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(url);
    req.flush(mockData);

    expect(req.request.method).toBe('GET');
  });
  it('should call searchBillBarcode and return expected data', () => {
    const { service, httpTestingController } = setup();

    const url = urlBuilder.services(ENV.api.services.bills.barcode);

    const payload: SearchBillBarcodePayload = {
      barcode: '1234567890'
    };

    const mockData: SearchBillBarcodeResponse = {
      amount: '1.000',
      serviceType: 'test',
      invoiceNum: '2',
      nie: 'test',
      orgId: {
        orgIdNum: '1',
        optOrgIdNum: '3'
      },
      biller: true,
      amountType: 'testype'
    };

    service.searchBillBarcode(payload).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(url);
    req.flush(mockData);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
  });
});
