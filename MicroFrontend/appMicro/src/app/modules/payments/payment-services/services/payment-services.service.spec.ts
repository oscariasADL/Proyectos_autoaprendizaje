import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { urlBuilder } from '@commons/utils/url-builder';
import { HttpStatus } from '@commons/constants/http.constants';
import { environment as ENV } from '@environment';
import {
  PayBillPayload,
  PaymentServiceScheduleCreatePayload
} from '../entities/payment-services.interface';
import { PaymentServicesService } from './payment-services.service';
import { SearchBillBarcodePayload } from '@modules/payments/payment-services/entities/register-service.interface';
import { PaymentBillFactory } from '@testing/factories/payment-bill.factory';
import { PayBillsMultiplePayload } from '@modules/payments/payment-services/pages/payment-services-pay-multiple/entities/services-pay-multiple.interface';

describe('PaymentServicesService', () => {
  let paymentServicesService: PaymentServicesService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentServicesService]
    });
    paymentServicesService = TestBed.inject(PaymentServicesService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const service: PaymentServicesService = TestBed.inject(
      PaymentServicesService
    );
    expect(service).toBeTruthy();
  });

  it('should to call fetchPaymentServices', () => {
    const url = urlBuilder.services(ENV.api.services.bills.services);
    const mockData = {};
    paymentServicesService.fetchPaymentServices().subscribe();
    const req = controller.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('GET');
  });

  it('should to call payBill', () => {
    const isRegistered = true;
    const url = urlBuilder.services(
      isRegistered
        ? ENV.api.services.bills.services_pay
        : ENV.api.services.bills.services_pay_unregistered
    );
    const payload: PayBillPayload = {
      productOrigin: {
        accountType: 'SDA',
        accountId: '123'
      },
      referenceId: '',
      invoiceNumber: '',
      agreementType: 1,
      maxPaymentDateComplete: '',
      amount: '',
      biller: true,
      organizationId: '',
      amountType: ''
    };
    const mockData = { approvalId: '1234', paymentDate: '' };
    paymentServicesService.payBill(payload, isRegistered).subscribe();
    const req = controller.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call payBill and response is 202', () => {
    const isRegistered = true;
    const url = urlBuilder.services(
      isRegistered
        ? ENV.api.services.bills.services_pay
        : ENV.api.services.bills.services_pay_unregistered
    );
    const payload: PayBillPayload = null;
    const mockData = { approvalId: '1234', paymentDate: '' };
    paymentServicesService.payBill(payload, isRegistered).subscribe();
    const req = controller.expectOne(url);
    req.flush(mockData, { status: HttpStatus.Accepted, statusText: '' });
    expect(req.request.method).toBe('POST');
  });

  it('should to call payBillsMultiple and response is 200', () => {
    const url = urlBuilder.services(
      ENV.api.services.bills.services_pay_multiple
    );
    const payload: PayBillsMultiplePayload = null;
    const mockData = { approvalId: '1234', paymentDate: '' };
    paymentServicesService.payBillsMultiple(payload).subscribe();
    const req = controller.expectOne(url);
    req.flush(mockData, { status: HttpStatus.Accepted, statusText: '' });
    expect(req.request.method).toBe('POST');
  });

  it('should to call searchServices', () => {
    const payload = 'huitaka';
    const url = urlBuilder.services(
      ENV.api.services.management_tc_server.agreements_pyc.consult
    );
    const mockData = {
      agreements: [
        {
          orgIdType: '196',
          orgIdNum: '00015890',
          orgName: 'COLEGIO HUITAKA FUSAGASUGA',
          industNum: '79468528',
          active: 'true',
          category: 'Otros Servicios',
          noBillerMainReference:
            '00015890||IDENTIFICACION|00015890|IDENTIFICACION||0|0|999||18||1|||||',
          isInvGen: 'false',
          urlImagen: 'https://avvillas.com.co/imagesebpp/00000090.jpg',
          city: 'Bogotá'
        }
      ]
    };
    paymentServicesService.searchCategories(payload).subscribe();
    const req = controller.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call searchBillReference', () => {
    const url = urlBuilder.services(
      ENV.api.services.bills.search_bill_reference
    );
    const mockData = {
      nie: '343',
      orgIdNum: '75643',
      maxPaymentDateComplete: '123'
    };
    paymentServicesService.searchBillReference(mockData).subscribe();
    const req = controller.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call searchBillBarcode', () => {
    const url = urlBuilder.services(ENV.api.services.bills.barcode);
    const payload: SearchBillBarcodePayload = {
      barcode: '343'
    };
    paymentServicesService.searchBillBarcode(payload).subscribe();
    const req = controller.expectOne(url);
    expect(req.request.method).toBe('POST');
  });

  it('should to call createScheduling', () => {
    const url = urlBuilder.services(ENV.api.services.bills.create_scheduling);
    const payload: PaymentServiceScheduleCreatePayload =
      new PaymentBillFactory().buildBillSchedulePayloadData();
    const mockData = {
      approvalId: '1234',
      paymentDate: ''
    };

    paymentServicesService.createScheduling(payload).subscribe();
    const req = controller.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });

  it('should to call editScheduling', () => {
    const url = urlBuilder.services(ENV.api.services.bills.create_scheduling);
    const payload: PaymentServiceScheduleCreatePayload =
      new PaymentBillFactory().buildBillSchedulePayloadData();
    const mockData = {
      approvalId: '1234',
      paymentDate: ''
    };

    paymentServicesService.editScheduling(payload).subscribe();
    const req = controller.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('PUT');
  });

  it('should to call deleteScheduling', () => {
    const url = urlBuilder.services(ENV.api.services.bills.delete_scheduling);
    const payload: PaymentServiceScheduleCreatePayload =
      new PaymentBillFactory().buildBillSchedulePayloadData();
    const mockData = {
      approvalId: '1234',
      paymentDate: ''
    };

    paymentServicesService.deleteScheduling(payload).subscribe();
    const req = controller.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toBe('POST');
  });
});
