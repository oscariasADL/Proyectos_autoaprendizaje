import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {
  CheckCustomerResult,
  CreateCustomer,
  CreateCustomerResponse,
  CustomerRemittancesType
} from '../pages/transfers-remittances/interfaces/remittance-services.interface';
import { urlBuilder } from '@app/commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { RemittanceService } from './remittance-services.service';
import { TestingModule } from '@testing/testing.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateServiceMock } from '@testing/mocks/services/translate.service.mock';
import { ProductNumberMaskPipe } from '@app/commons/pipes/product-number-mask.pipe';
import { AppFacade } from '@app/app.facade';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

describe('RemittanceService', () => {
  let service: RemittanceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RemittanceService,
        TestingModule,
        { provide: TranslateService, useClass: TranslateServiceMock },
        { provide: AppFacade, useClass: AppFacadeMock },
        ProductNumberMaskPipe
      ]
    });
    service = TestBed.inject(RemittanceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('createCustomer', () => {
    it('should create a customer successfully', () => {
      const mockPayload: CreateCustomer = {
        numberAccount: '1234567890',
        typeAccount: 'SAVINGS'
      };
      const mockResponse: CreateCustomerResponse = {
        document: '12345678',
        documentType: 'CC',
        numberAccount: '1234567890',
        typeAccount: TypeAccount.SDA,
        cellphone: '3001234567',
        clientName: 'John Doe',
        registerDate: '2023-12-01T10:00:00.000Z',
        registerIp: '192.168.1.1',
        approvalId: 'APPR123',
        nameWallet: 'MyWallet'
      };
      const expectedUrl = urlBuilder.services(
        ENV.api.services.remittance.register_account
      );
      service.createCustomer(mockPayload).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        expect(response.document).toBe('12345678');
        expect(response.documentType).toBe('CC');
        expect(response.numberAccount).toBe('1234567890');
        expect(response.typeAccount).toBe(TypeAccount.SDA);
        expect(response.clientName).toBe('John Doe');
        expect(response.approvalId).toBe('APPR123');
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockPayload);
      req.flush(mockResponse);
    });

    it('should handle error when creating customer fails', () => {
      const mockPayload: CreateCustomer = {
        numberAccount: '1234567890',
        typeAccount: 'SAVINGS'
      };
      const mockErrorResponse = {
        status: 400,
        statusText: 'Bad Request',
        error: { message: 'Invalid customer data' }
      };

      const expectedUrl = urlBuilder.services(
        ENV.api.services.remittance.register_account
      );

      service.createCustomer(mockPayload).subscribe({
        next: () => fail('Expected error but got success'),
        error: (error) => {
          expect(error.status).toBe(400);
          expect(error.statusText).toBe('Bad Request');
        }
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockPayload);
      req.flush(mockErrorResponse.error, mockErrorResponse);
    });

    it('should send correct URL and payload', () => {
      const mockPayload: CreateCustomer = {
        numberAccount: '0987654321',
        typeAccount: 'CURRENT'
      };

      const mockResponse: CreateCustomerResponse = {
        document: '87654321',
        documentType: 'CC',
        numberAccount: '0987654321',
        typeAccount: TypeAccount.SDA,
        cellphone: '3007654321',
        clientName: 'Jane Smith',
        registerDate: '2023-12-01T11:00:00.000Z',
        registerIp: '192.168.1.2',
        approvalId: 'APPR456',
        nameWallet: 'JaneWallet'
      };

      const expectedUrl = urlBuilder.services(
        ENV.api.services.remittance.register_account
      );

      service.createCustomer(mockPayload).subscribe();

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.url).toBe(expectedUrl);
      expect(req.request.body).toEqual(mockPayload);

      req.flush(mockResponse);
    });
  });

  describe('validateCustomer', () => {
    it('should validate customer successfully', () => {
      const mockResponse: CheckCustomerResult = {
        tokenInfo: {
          accessToken: '*****'
        },
        infoAccount: {
          document: '12345678',
          documentType: 'CC',
          numberAccount: '1234567890',
          cellphone: '3001234567',
          clientName: 'John Doe',
          nameWallet: 'MyWallet'
        },
        customer: CustomerRemittancesType.A
      };

      const expectedUrl = urlBuilder.services(
        ENV.api.services.remittance.customer_validate
      );

      service.validateCustomer().subscribe((response) => {
        expect(response).toEqual(mockResponse);
        expect(response.tokenInfo.accessToken).toBeTruthy();
        expect(response.infoAccount?.document).toBe('12345678');
        expect(response.customer).toBe(CustomerRemittancesType.A);
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({});

      req.flush(mockResponse);
    });

    it('should handle invalid customer validation', () => {
      const mockResponse: CheckCustomerResult = {
        tokenInfo: {
          accessToken: ''
        },
        customer: CustomerRemittancesType.F
      };

      const expectedUrl = urlBuilder.services(
        ENV.api.services.remittance.customer_validate
      );

      // Act
      service.validateCustomer().subscribe((response) => {
        // Assert
        expect(response).toEqual(mockResponse);
        expect(response.tokenInfo.accessToken).toBe('');
        expect(response.infoAccount).toBeUndefined();
        expect(response.customer).toBe(CustomerRemittancesType.F);
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({});

      req.flush(mockResponse);
    });

    it('should handle error when validation fails', () => {
      const mockErrorResponse = {
        status: 500,
        statusText: 'Internal Server Error',
        error: { message: 'Server error during validation' }
      };

      const expectedUrl = urlBuilder.services(
        ENV.api.services.remittance.customer_validate
      );
      service.validateCustomer().subscribe({
        next: () => fail('Expected error but got success'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        }
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({});
      req.flush(mockErrorResponse.error, mockErrorResponse);
    });

    it('should send correct URL and empty payload', () => {
      const mockResponse: CheckCustomerResult = {
        tokenInfo: {
          accessToken: 'valid_token_123'
        },
        infoAccount: {
          document: '11111111',
          documentType: 'CC',
          numberAccount: '1111111111',
          cellphone: '3009999999',
          clientName: 'Test User',
          nameWallet: 'TestWallet'
        },
        customer: CustomerRemittancesType.A
      };

      const expectedUrl = urlBuilder.services(
        ENV.api.services.remittance.customer_validate
      );
      service.validateCustomer().subscribe();
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.url).toBe(expectedUrl);
      expect(req.request.body).toEqual({});

      req.flush(mockResponse);
    });
  });

  describe('HTTP Configuration', () => {
    it('should use correct URL builder for createCustomer', () => {
      const mockPayload: CreateCustomer = {
        numberAccount: '1111111111',
        typeAccount: 'SAVINGS'
      };

      const expectedUrl = urlBuilder.services(
        ENV.api.services.remittance.register_account
      );
      service.createCustomer(mockPayload).subscribe();
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.url).toBe(expectedUrl);
      req.flush({});
    });

    it('should use correct URL builder for validateCustomer', () => {
      const expectedUrl = urlBuilder.services(
        ENV.api.services.remittance.customer_validate
      );
      service.validateCustomer().subscribe();
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.url).toBe(expectedUrl);

      req.flush({});
    });
  });
});
