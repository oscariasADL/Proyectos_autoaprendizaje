import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { RechargesService } from './recharges.service';

describe('RechargesService', () => {
  const setup = (): {
    service: RechargesService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(RechargesService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RechargesService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: RechargesService = TestBed.inject(RechargesService);
    expect(service).toBeTruthy();
  });

  it('should to call recharge', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.payments.mobile_recharge);
    const mockData = {};
    service.recharge(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
