import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { capitalize, isNullOrUndefined } from '@commons/helpers/text.helpers';
import { environment as ENV } from '@environment';
import {
  PayBillPayload,
  PaymentServiceScheduleCreatePayload,
  PaymentServicesResponse
} from '@modules/payments/payment-services/entities/payment-services.interface';
import {
  throwErrorBillIfNecessary,
  throwErrorBillReferenceIfNecessary
} from '@modules/payments/payment-services/helpers/payment-services.helper';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  SearchBillBarcodePayload,
  SearchBillBarcodeResponse,
  SearchBillReferencePayload,
  SearchBillReferenceResponse,
  ServiceData
} from '../entities/register-service.interface';
import {
  PayBillsMultiplePayload,
  PayBillsMultipleResponse
} from '@modules/payments/payment-services/pages/payment-services-pay-multiple/entities/services-pay-multiple.interface';

@Injectable()
export class PaymentServicesService {
  constructor(private http: HttpClient) {}

  public fetchPaymentServices(): Observable<PaymentServicesResponse> {
    const url = urlBuilder.services(ENV.api.services.bills.services);
    return this.http.get<PaymentServicesResponse>(url);
  }

  public payBill(
    payload: PayBillPayload,
    isRegistered: boolean
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(
      isRegistered
        ? ENV.api.services.bills.services_pay
        : ENV.api.services.bills.services_pay_unregistered
    );
    //delete payload?.organizationName;
    return this.http
      .post<{ approvalId: string; paymentDate: string }>(url, payload)
      .pipe(
        map(
          ({ approvalId, paymentDate: transactionDate }) =>
            ({
              approvalId,
              transactionDate
            } as GenericResponse)
        )
      );
  }

  public payBillsMultiple(
    payload: PayBillsMultiplePayload
  ): Observable<PayBillsMultipleResponse> {
    const url = urlBuilder.services(
      ENV.api.services.bills.services_pay_multiple
    );

    return this.http.post<PayBillsMultipleResponse>(url, payload);
  }

  public searchCategories(query: string): Observable<ServiceData[]> {
    const url = urlBuilder.services(
      ENV.api.services.management_tc_server.agreements_pyc.consult
    );
    return this.http
      .post<any>(url, {
        name: query,
        channel: 'MB',
        orgIdType: '',
        orgIdNum: '',
        cityId: ''
      })
      .pipe(
        map((resp) => {
          return [...resp.agreements].map((val) => {
            const city = capitalize(val?.city)?.replace('d.c', 'D.C');
            const category = capitalize(val?.category?.toUpperCase());
            return {
              name: val?.orgName,
              description: `${city} - ${category}`,
              orgIdNum: val?.orgIdNum,
              imageUrl: val?.urlImagen?.replace(' ', ''),
              isBiller: val?.isInvGen?.toLowerCase() === 'true',
              cityInfo: {
                code: val?.industNum,
                name: city
              }
            };
          });
        })
      );
  }

  public searchBillReference(
    payload: SearchBillReferencePayload
  ): Observable<SearchBillReferenceResponse> {
    const url = urlBuilder.services(
      ENV.api.services.bills.search_bill_reference
    );
    return this.http.post<SearchBillReferenceResponse>(url, payload).pipe(
      tap((data) => throwErrorBillIfNecessary(data)),
      catchError((error: HttpErrorResponse) =>
        throwErrorBillReferenceIfNecessary(error)
      )
    );
  }

  public searchBillBarcode(
    payload: SearchBillBarcodePayload
  ): Observable<SearchBillBarcodeResponse> {
    const url = urlBuilder.services(ENV.api.services.bills.barcode);
    return this.http.post<SearchBillBarcodeResponse>(url, payload);
  }

  public createScheduling(
    payload: PaymentServiceScheduleCreatePayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.bills.create_scheduling);
    return this.http.post<GenericResponse>(url, payload);
  }

  public editScheduling(
    payload: PaymentServiceScheduleCreatePayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.bills.create_scheduling);
    return this.http.put<GenericResponse>(url, payload);
  }

  public deleteScheduling(
    payload: PaymentServiceScheduleCreatePayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.bills.delete_scheduling);
    return this.http.post<GenericResponse>(url, payload);
  }
}
