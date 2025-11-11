import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ActivateTokenService } from './activate-token.service';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';

describe('ActivateTokenService', () => {
  let service: ActivateTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivateTokenService]
    });
    service = TestBed.inject(ActivateTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should to call fetchLastToken', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    const url = urlBuilder.services(ENV.api.services.wallets.last_token);
    const mockData = {};
    service.fetchLastToken().subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call activateToken', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    const url = urlBuilder.services(ENV.api.services.wallets.activate_token);
    const mockData = {};
    service.activateToken(null).subscribe();
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
