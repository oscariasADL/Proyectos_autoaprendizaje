import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { ProductDetailService } from './product-detail.service';

describe('ProductDetailService', () => {
  const setup = (): {
    service: ProductDetailService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(ProductDetailService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductDetailService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: ProductDetailService = TestBed.inject(ProductDetailService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchProductDetail', () => {
    const { service, httpTestingController } = setup();
    const id = '123';
    const url = urlBuilder.services(ENV.api.services.base.account_detail, {
      id
    });
    const mockData = {};
    service.fetchProductDetail(id).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchMovementsDetail', () => {
    const { service, httpTestingController } = setup();
    const payload = {
      id: '123',
      params: { page: 1 }
    };
    const url =
      urlBuilder.services(ENV.api.services.base.movements_detail, {
        id: payload.id
      }) + '?page=1';
    const mockData = {};
    service.fetchMovementsDetail(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });
});
