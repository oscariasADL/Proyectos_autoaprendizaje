import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { QrPayService } from './qr-pay.service';

describe('QrPayService', () => {
  const setup = (): {
    service: QrPayService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(QrPayService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QrPayService]
    })
  );

  it('should be created', () => {
    const service: QrPayService = TestBed.inject(QrPayService);
    expect(service).toBeTruthy();
  });

  it('should to call parseQR', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.qr.code);
    const mockData = {};
    service.parseQR('').subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call payQR', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.qr.payment);
    const mockData = {};
    service.payQR(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call payQRAccount', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.qr.payment_dale);
    const mockData = {};
    service.payQrAccount(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call cancelQR', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.qr.payment);
    const mockData = {};
    service.cancelQR(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('PUT');
  });

  it('should to call paymentMethods', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.products.payment_methods);
    const mockData = {};
    service.paymentMethods().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call paymentMethodQRData', () => {
    const { service, httpTestingController } = setup();
    const referenceLabel = '1234';
    const url = urlBuilder.services(ENV.api.services.qr.payment_method, {
      reference_label: referenceLabel
    });
    const mockData = {};
    service.paymentMethodQRData(referenceLabel).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });
});
