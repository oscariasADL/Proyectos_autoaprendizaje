import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import {
  ActivationPayloadRequest,
  ActivationProduct
} from '../entities/security-media.interface';
import { SecurityMediaActivationService } from './security-media-activation.service';

describe('SecurityMediaActivationService', () => {
  const setup = (): {
    service: SecurityMediaActivationService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(SecurityMediaActivationService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecurityMediaActivationService]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: SecurityMediaActivationService = TestBed.inject(
      SecurityMediaActivationService
    );
    expect(service).toBeTruthy();
  });

  it('should to call fetchActivations', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.base.activations);
    const mockData = [];
    service.fetchActivations().subscribe((resp) => expect(resp).toEqual(resp));
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call activateProduct', () => {
    const url = urlBuilder.services(ENV.api.services.base.activations);
    const { service, httpTestingController } = setup();
    const payload: ActivationPayloadRequest = {
      id: '123',
      pin: '1376'
    };
    const mockData = {
      approvalId: '123',
      transactionDate: '',
      name: '',
      code: '',
      description: ''
    };

    service.activateProduct(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call blockProduct', () => {
    const url = urlBuilder.services(ENV.api.services.base.blocking);
    const { service, httpTestingController } = setup();
    const id = '1234';
    const mockData = {
      approvalId: '123',
      transactionDate: ''
    };
    service.blockProduct(id).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call temporary block', () => {
    const url = urlBuilder.services(ENV.api.services.base.temporary_block);
    const { service, httpTestingController } = setup();
    const payload = {
      id: '123',
      endDate: '12-12-2020'
    };
    const mockData = {
      approvalId: '123',
      transactionDate: ''
    };
    service.temporaryBlock(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call unlock product', () => {
    const url = urlBuilder.services(ENV.api.services.base.temporary_unblock);
    const { service, httpTestingController } = setup();
    const product = { id: '123' } as ActivationProduct;
    const mockData = {
      approvalId: '123',
      transactionDate: ''
    };
    service.unblockProduct(product).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call suspicious transaction', () => {
    const { service, httpTestingController } = setup();
    const product = { id: '123' } as ActivationProduct;
    const url = urlBuilder.services(
      ENV.api.services.base.suspicious_transaction,
      { id: product.id }
    );
    const mockData = [];
    service
      .suspiciousTransaction(product)
      .subscribe((resp) => expect(resp).toEqual(resp));
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });
});
