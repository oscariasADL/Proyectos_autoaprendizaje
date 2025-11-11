import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { ProductService } from './product.service';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

describe('ProductService', () => {
  const setup = (): {
    service: ProductService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(ProductService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        CapitalizePipe,
        { provide: AppFacade, useClass: AppFacadeMock }
      ]
    })
  );

  it('should be created', () => {
    const service: ProductService = TestBed.inject(ProductService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchBalance', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.base.balance_without_detail
    );
    const mockData = {};
    service.fetchBalance().subscribe();
    const req = httpTestingController.expectOne(
      url + '?hasCreditProducts=false'
    );
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchBalance without reload', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(
      ENV.api.services.base.balance_without_detail
    );
    const mockData = {};
    service.fetchBalance(true).subscribe();
    const req = httpTestingController.expectOne(
      url + '?hasCreditProducts=false&onlyCreditCard=true'
    );
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchNicknames', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.base.nicknames);
    const mockData = {};
    service.fetchNicknames().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchSpiAuthorization', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.base.spiAuthorization);
    const mockData = {};
    service.fetchSpiAuthorization().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call acceptSpiConsent', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.base.acceptSpiConsent);
    const mockData = {};
    service.acceptSpiConsent().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
