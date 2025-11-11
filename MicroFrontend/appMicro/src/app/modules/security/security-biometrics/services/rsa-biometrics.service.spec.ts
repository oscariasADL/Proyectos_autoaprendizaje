import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { RsaBiometricsService } from './rsa-biometrics.service';
import { GenericResponse } from '@app/commons/entities/response/response.interface';
import { urlBuilder } from '@app/commons/utils/url-builder';
import { environment as ENV } from '@environment';

describe('RsaBiometricsService', () => {
  let service: RsaBiometricsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RsaBiometricsService]
    });

    service = TestBed.inject(RsaBiometricsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('callRSABiometrics', () => {
    it('should send a POST request to the correct URL with empty body', () => {
      const mockResponse: GenericResponse = {
        name: 'test',
        approvalId: '2',
        transactionDate: new Date().toISOString(),
        code: '200',
        description: ''
      };

      const expectedUrl = urlBuilder.services(
        ENV.api.services.auth.rsa_biometrics
      );

      let actualResponse: GenericResponse | undefined;
      service.callRSABiometrics().subscribe((response) => {
        actualResponse = response;
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({});

      req.flush(mockResponse);

      expect(actualResponse).toEqual(mockResponse);
    });

    it('should handle error responses properly', () => {
      const expectedUrl = urlBuilder.services(
        ENV.api.services.auth.rsa_biometrics
      );

      const mockErrorResponse = {
        status: 404,
        statusText: 'Not Found'
      };

      let actualError: any;
      service.callRSABiometrics().subscribe({
        next: () => {
          fail('should have failed with 404 error');
        },
        error: (error) => {
          actualError = error;
        }
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      req.flush('Not Found', mockErrorResponse);

      expect(actualError.status).toBe(404);
    });

    it('should handle network errors', () => {
      const expectedUrl = urlBuilder.services(
        ENV.api.services.auth.rsa_biometrics
      );

      let actualError: any;
      service.callRSABiometrics().subscribe({
        next: () => {
          fail('should have failed with network error');
        },
        error: (error) => {
          actualError = error;
        }
      });

      // Verificamos la solicitud HTTP y simulamos un error de red
      const req = httpMock.expectOne(expectedUrl);
      const mockError = new ErrorEvent('Network error', {
        message: 'simulated network error'
      });

      req.error(mockError);

      // Verificamos que se haya capturado correctamente el error
      expect(actualError.error.message).toBe('simulated network error');
    });
  });
});
