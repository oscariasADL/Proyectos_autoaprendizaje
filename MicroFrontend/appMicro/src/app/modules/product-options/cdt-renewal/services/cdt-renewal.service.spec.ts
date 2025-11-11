import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { CdtRenewalService } from './cdt-renewal.service';
import {
  CdtRenewalRequest,
  CdtRenewalStatus
} from '@modules/product-options/cdt-renewal/entities/cdt-renewal.entity';

describe('CdtRenewalService', () => {
  const setup = (): {
    service: CdtRenewalService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(CdtRenewalService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CdtRenewalService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: CdtRenewalService = TestBed.inject(CdtRenewalService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchAccountDetails', () => {
    const { service, httpTestingController } = setup();
    const id = '123';
    const url = urlBuilder.services(ENV.api.services.management.cdt_details);
    const mockData = {};
    service.fetchAccountDetails(id).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call renewalCDT', () => {
    const { service, httpTestingController } = setup();
    const payload: CdtRenewalRequest = {
      productId: 'abcd123',
      reInvest: CdtRenewalStatus.ACTIVE
    };
    const url = urlBuilder.services(ENV.api.services.management.cdt_renewal);
    const mockData = {};
    service.renewalCDT(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call fetchAccountDetails', () => {
    const { service, httpTestingController } = setup();
    const payload: CdtRenewalRequest = {
      productId: 'abcd123',
      reInvest: CdtRenewalStatus.ACTIVE
    };
    const url = urlBuilder.services(ENV.api.services.management.cdt_cancel);
    const mockData = {};
    service.cancelCDT(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
