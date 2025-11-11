import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  const setup = (): {
    service: ConfigService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(ConfigService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigService, CapitalizePipe]
    })
  );

  it('should be created', () => {
    const service: ConfigService = TestBed.inject(ConfigService);
    expect(service).toBeTruthy();
  });

  it('should to call fetchConfig', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.management.config);
    const mockData = {};
    service.fetchConfig().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call fetchIP', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.management.ip);
    const mockData = {};
    service.fetchIP().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });
});
