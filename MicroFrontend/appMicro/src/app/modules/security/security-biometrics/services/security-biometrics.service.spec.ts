import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { SecurityBiometricsService } from './security-biometrics.service';

describe('SecurityBiometricsService', () => {
  const setup = (): {
    service: SecurityBiometricsService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(SecurityBiometricsService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecurityBiometricsService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: SecurityBiometricsService = TestBed.inject(
      SecurityBiometricsService
    );
    expect(service).toBeTruthy();
  });

  it('should to call verifyPassword', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.auth.identity);
    const mockData = {};
    service.verifyPassword(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
