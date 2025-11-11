import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { RandomKeyService } from './random-key.service';
import {
  RandomKeyPayload,
  RandomKeyResponse
} from '../entities/customize-aval-tag.interface';
import { urlBuilder } from '@app/commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { TypeAccount } from '@app/commons/entities/product/type-account';

describe('RandomKeyService', () => {
  let service: RandomKeyService;
  let httpMock: HttpTestingController;
  let mockUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RandomKeyService]
    });

    service = TestBed.inject(RandomKeyService);
    httpMock = TestBed.inject(HttpTestingController);
    mockUrl = urlBuilder.services(ENV.api.services.base.suggest_keys);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRandomKey', () => {
    it('should make POST request with correct URL and payload', () => {
      // Arrange
      const mockPayload: RandomKeyPayload = {
        accountType: TypeAccount.SDA,
        accountId: '123456789'
      };

      const mockResponse: RandomKeyResponse = {
        keySuggestions: [
          { key: 'test-key-1', keyType: 'primary' },
          { key: 'test-key-2', keyType: 'secondary' },
          { key: 'test-key-3', keyType: 'primary' }
        ]
      };

      // Act
      service.getRandomKey(mockPayload).subscribe((response) => {
        // Assert
        expect(response).toEqual(mockResponse);
      });

      // Assert HTTP request
      const req = httpMock.expectOne(mockUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockPayload);
      expect(req.request.url).toBe(mockUrl);

      // Simulate server response
      req.flush(mockResponse);
    });

    it('should return Observable<RandomKeyResponse>', () => {
      // Arrange
      const mockPayload: RandomKeyPayload = {
        accountType: TypeAccount.DDA,
        accountId: '987654321'
      };

      const mockResponse: RandomKeyResponse = {
        keySuggestions: [
          { key: 'random-key-1', keyType: 'auto' },
          { key: 'random-key-2', keyType: 'manual' }
        ]
      };

      // Act
      const result = service.getRandomKey(mockPayload);

      // Assert
      expect(result).toBeDefined();

      result.subscribe((response) => {
        expect(response).toEqual(mockResponse);
        expect(response.keySuggestions).toBeInstanceOf(Array);
        expect(response.keySuggestions.length).toBe(2);
      });

      const req = httpMock.expectOne(mockUrl);
      req.flush(mockResponse);
    });

    it('should handle HTTP error responses', () => {
      // Arrange
      const mockPayload: RandomKeyPayload = {
        accountType: TypeAccount.CCA,
        accountId: '000'
      };

      const mockErrorResponse = {
        status: 400,
        statusText: 'Bad Request',
        error: { message: 'Invalid payload' }
      };

      // Act & Assert
      service.getRandomKey(mockPayload).subscribe({
        next: () => fail('Expected error, but got success'),
        error: (error) => {
          expect(error.status).toBe(400);
          expect(error.statusText).toBe('Bad Request');
        }
      });

      const req = httpMock.expectOne(mockUrl);
      req.flush(mockErrorResponse.error, {
        status: mockErrorResponse.status,
        statusText: mockErrorResponse.statusText
      });
    });

    it('should handle network errors', () => {
      // Arrange
      const mockPayload: RandomKeyPayload = {
        accountType: TypeAccount.LOC,
        accountId: '999'
      };

      // Act & Assert
      service.getRandomKey(mockPayload).subscribe({
        next: () => fail('Expected error, but got success'),
        error: (error) => {
          expect(error.error.type).toBe('network');
        }
      });

      const req = httpMock.expectOne(mockUrl);
      req.error(
        new ErrorEvent('network', {
          message: 'Network error'
        })
      );
    });

    it('should handle empty payload', () => {
      // Arrange
      const mockPayload: RandomKeyPayload = {
        accountType: TypeAccount.SDA,
        accountId: ''
      };
      const mockResponse: RandomKeyResponse = {
        keySuggestions: []
      };

      // Act
      service.getRandomKey(mockPayload).subscribe((response) => {
        // Assert
        expect(response).toEqual(mockResponse);
        expect(response.keySuggestions).toEqual([]);
      });

      const req = httpMock.expectOne(mockUrl);
      expect(req.request.body).toEqual(mockPayload);
      req.flush(mockResponse);
    });

    it('should handle different account types correctly', () => {
      // Test para cada tipo de cuenta
      const testCases = [
        {
          accountType: TypeAccount.SDA,
          accountId: '123',
          description: 'Cuenta de Ahorros'
        },
        {
          accountType: TypeAccount.DDA,
          accountId: '456',
          description: 'Cuenta Corriente'
        },
        { accountType: TypeAccount.AFC, accountId: '789', description: 'AFC' },
        {
          accountType: TypeAccount.CCA,
          accountId: '101',
          description: 'T. Crédito'
        },
        {
          accountType: TypeAccount.LOC,
          accountId: '102',
          description: 'Crédito Rotativo'
        },
        {
          accountType: TypeAccount.DLA,
          accountId: '103',
          description: 'Crédito a largo plazo'
        },
        { accountType: TypeAccount.CDA, accountId: '104', description: 'CDT' },
        {
          accountType: TypeAccount.DE,
          accountId: '105',
          description: 'Dinero Extra'
        },
        {
          accountType: TypeAccount.CH,
          accountId: '106',
          description: 'Crédito Hipotecario'
        },
        {
          accountType: TypeAccount.CEL,
          accountId: '107',
          description: 'Celular'
        },
        {
          accountType: TypeAccount.FID,
          accountId: '108',
          description: 'Fiducia'
        },
        {
          accountType: TypeAccount.DEL,
          accountId: '109',
          description: 'Deposito electrónico'
        }
      ];

      testCases.forEach((testCase) => {
        const payload: RandomKeyPayload = {
          accountType: testCase.accountType,
          accountId: testCase.accountId
        };

        const mockResponse: RandomKeyResponse = {
          keySuggestions: [
            { key: `${testCase.accountType}-key-1`, keyType: 'auto' },
            { key: `${testCase.accountType}-key-2`, keyType: 'manual' }
          ]
        };

        service.getRandomKey(payload).subscribe((response) => {
          expect(response).toEqual(mockResponse);
          expect(response.keySuggestions.length).toBe(2);
        });

        const req = httpMock.expectOne(mockUrl);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(payload);
        req.flush(mockResponse);
      });
    });

    it('should handle various accountId formats', () => {
      const testCases = [
        { accountId: '1', description: 'single digit' },
        { accountId: '123', description: 'multiple digits' },
        { accountId: '123456789012345', description: 'long account id' },
        { accountId: 'ABC123', description: 'alphanumeric' },
        { accountId: '000000', description: 'zeros' }
      ];

      testCases.forEach((testCase) => {
        const payload: RandomKeyPayload = {
          accountType: TypeAccount.SDA,
          accountId: testCase.accountId
        };

        const mockResponse: RandomKeyResponse = {
          keySuggestions: [
            { key: `key-for-${testCase.accountId}`, keyType: 'generated' }
          ]
        };

        service.getRandomKey(payload).subscribe((response) => {
          expect(response.keySuggestions[0].key).toContain(testCase.accountId);
        });

        const req = httpMock.expectOne(mockUrl);
        expect(req.request.body.accountId).toBe(testCase.accountId);
        req.flush(mockResponse);
      });
    });
  });

  it('should use correct URL from urlBuilder and environment', () => {
    // Arrange
    const mockPayload: RandomKeyPayload = {
      accountType: TypeAccount.FID,
      accountId: '1'
    };

    // Spy on urlBuilder to verify it's called correctly
    spyOn(urlBuilder, 'services').and.returnValue(mockUrl);

    // Act
    service.getRandomKey(mockPayload).subscribe();

    // Assert
    expect(urlBuilder.services).toHaveBeenCalledWith(
      ENV.api.services.base.suggest_keys
    );

    const req = httpMock.expectOne(mockUrl);
    req.flush({ keySuggestions: [] });
  });
});
