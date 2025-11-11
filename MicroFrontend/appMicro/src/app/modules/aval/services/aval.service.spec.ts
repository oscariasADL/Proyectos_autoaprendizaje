import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { AvalService } from './aval.service';

describe('AvalService', () => {
  const setup = (): {
    service: AvalService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(AvalService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AvalService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: AvalService = TestBed.inject(AvalService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchAvalProducts', () => {
    const { service, httpTestingController } = setup();
    const code = '123';
    const url =
      urlBuilder.services(ENV.api.services.base.aval_balance) +
      `?bankCode=${code}`;
    const mockData = {};
    service.fetchAvalProducts(code).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchTuplusProducts', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.base.aval_tuplus);
    const mockData = {};
    service.fetchTuplusProducts().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchStockProducts', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.base.aval_stocks);
    const mockData = {};
    service.fetchStockProducts().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchStockDetail', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.base.aval_stocks);
    const mockData = {};
    const payload = null;
    service.fetchStockDetail(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
