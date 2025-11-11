import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { CapitalizePipe } from '@commons/pipes/capitalize.pipe';
import {
  PayBillPayload,
  PaymentServicesResponse
} from '@modules/payments/payment-services/entities/payment-services.interface';
import {
  SearchBillReferencePayload,
  SearchBillReferenceResponse,
  ServiceData
} from '@modules/payments/payment-services/entities/register-service.interface';
import { BillFactory } from '@testing/factories/bill.factory';
import { PaymentBillFactory } from '@testing/factories/payment-bill.factory';
import { Observable, of } from 'rxjs';

@Injectable()
export class PaymentServicesServiceMock {
  constructor(private http: HttpClient, private capitalize: CapitalizePipe) {}

  public fetchPaymentServices(): Observable<PaymentServicesResponse> {
    return of(new PaymentBillFactory().buildPaymentServicesResponse());
  }

  public payBill(
    payload: PayBillPayload,
    isRegistered: boolean
  ): Observable<GenericResponse> {
    return of();
  }

  public searchCategories(query: string): Observable<ServiceData[]> {
    return of([new BillFactory().mockToBarcode()]);
  }

  public searchBillReference(
    payload: SearchBillReferencePayload
  ): Observable<SearchBillReferenceResponse> {
    return of();
  }
}
