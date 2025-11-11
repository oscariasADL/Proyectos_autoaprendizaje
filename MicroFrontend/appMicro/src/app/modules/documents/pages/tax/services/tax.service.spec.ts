import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment as ENV } from '@environment';
import { TaxService } from './tax.service';
import { TestBed } from '@angular/core/testing';
import { urlBuilder } from '@commons/utils/url-builder';

describe('TaxService', () => {
  const setup = (): {
    service: TaxService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(TaxService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaxService]
    })
  );

  it('should execute for get method', () => {
    const { service, httpTestingController } = setup();
    const year = 2020;
    const url = urlBuilder.services(
      ENV.api.services.statements.tax.certificate,
      {
        year
      }
    );
    const mockData = {};
    service.fetchTaxCertificate(year).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });
});
