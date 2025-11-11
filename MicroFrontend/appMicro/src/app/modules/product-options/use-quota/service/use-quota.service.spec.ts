import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { UseQuotaService } from './use-quota.service';
import { USE_QUOTA_INSTALLMENTS_TYPE } from '@modules/product-options/use-quota/constants/use-quota.constants';

describe('UseQuotaService', () => {
  const setup = (): {
    service: UseQuotaService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(UseQuotaService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UseQuotaService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: UseQuotaService = TestBed.inject(UseQuotaService);
    expect(service).toBeTruthy();
  });

  it('should to call useQuota', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.transactions.use_quota);
    const mockData = {};
    service.useQuota(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call getInstallments', () => {
    const { service, httpTestingController } = setup();
    const account_id = '345678';
    const url =
      urlBuilder.services(ENV.api.services.payments.installments, {
        account_id
      }) +
      '?type=' +
      USE_QUOTA_INSTALLMENTS_TYPE;
    const mockData = {};
    service.getInstallments(account_id).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });
});
