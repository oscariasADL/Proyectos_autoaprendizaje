import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { FA2AuthService } from './fa2-auth.service';
import {
  FA2Payload,
  FA2PayloadResponse
} from '../entities/notifications/notification.entities';
import { environment as ENV } from '@environment';
import { urlBuilder } from '../utils/url-builder';

describe('FA2AuthService', () => {
  let service: FA2AuthService;
  let httpMock: HttpTestingController;
  const mockUrl = urlBuilder.services(ENV.api.services.security.secondFA);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FA2AuthService]
    });
    service = TestBed.inject(FA2AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call 2FA Auth API with correct headers and payload', () => {
    const mockPayload: FA2Payload = {
      document: '123',
      secretQr: '2323',
      txId: '222'
    };
    const mockResponse: FA2PayloadResponse = {
      httpCode: '200',
      httpMessage: 'ok'
    };

    service.call2FAAuth(mockPayload).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockPayload);

    req.flush(mockResponse);
  });
});
