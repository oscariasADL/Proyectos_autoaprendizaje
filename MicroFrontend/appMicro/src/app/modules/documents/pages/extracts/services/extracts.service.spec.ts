import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { ExtractsService } from './extracts.service';

describe('ExtractsService', () => {
  const setup = (): {
    service: ExtractsService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(ExtractsService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExtractsService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: ExtractsService = TestBed.inject(ExtractsService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchPeriods', () => {
    const { service, httpTestingController } = setup();
    const productId = '123';
    const url = urlBuilder.services(
      ENV.api.services.statements.extracts.period,
      {
        product_id: productId
      }
    );
    const mockData = {};
    service.fetchPeriods(productId).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchExtract', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.statements.extracts.file);
    const mockData = {};
    const payload = null;
    service.fetchExtract(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
