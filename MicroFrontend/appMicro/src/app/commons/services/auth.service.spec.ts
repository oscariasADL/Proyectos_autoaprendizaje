import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const setup = (): {
    service: AuthService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.inject(AuthService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { service, httpTestingController };
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it('should be created', () => {
    const service: AuthService = TestBed.inject(AuthService);
    expect(service).toBeTruthy();
  });

  it('should to call login', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.auth.login);
    const mockData = {};
    const payload = {
      typeDocument: '',
      document: '',
      password: '',
      deviceName: '',
      deviceSerial: ''
    };
    service.login(payload).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call logout', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.auth.logout);
    const mockData = {};
    service.logout().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call fetchInterchangeKey', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.security.interchange);
    const mockData = {};
    service.fetchInterchangeKey().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call getInterchangeKey', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.security.interchange);
    const mockData = {};
    service.getInterchangeKey('', '').subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call fetchPing', () => {
    const { service, httpTestingController } = setup();
    const url = urlBuilder.services(ENV.api.services.auth.ping);
    const mockData = {};
    service.fetchPing().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });
});
