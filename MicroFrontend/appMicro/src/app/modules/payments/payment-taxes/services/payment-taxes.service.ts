import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import {
  SearchBillBarcodePayload,
  SearchBillBarcodeResponse
} from '@modules/payments/payment-services/entities/register-service.interface';
import { Observable } from 'rxjs';
import {
  AgreementDetail,
  AgreementTaxes,
  PaymentsAgreementsResponse,
  PaymentsReferenceValueRequest,
  PaymentTaxesRequest
} from '../entities/payment-taxes.interface';

@Injectable()
export class PaymentTaxesService {
  constructor(private http: HttpClient) {}

  public fetchCities(): Observable<any> {
    const url = urlBuilder.services(ENV.api.services.taxes.tax_cities);

    return this.http.get<any>(url);
  }

  public fetchAgreementsByCity(
    cityCode: string
  ): Observable<PaymentsAgreementsResponse> {
    const url = urlBuilder.services(ENV.api.services.taxes.tax_agreements);
    return this.http.get<PaymentsAgreementsResponse>(
      url + `?cityCode=${cityCode}`
    );
  }

  public fetchAgreementByCode(code: string): Observable<AgreementTaxes> {
    const url = urlBuilder.services(ENV.api.services.taxes.tax_agreementDetail);
    return this.http.get<AgreementTaxes>(url + `?code=${code}`);
  }

  public fetchAgreementDetail(
    payload: PaymentsReferenceValueRequest
  ): Observable<HttpResponse<AgreementDetail>> {
    const url = urlBuilder.services(ENV.api.services.taxes.tax_detail);
    const req = {
      invoiceNumber: payload.reference,
      orgIdNum: payload.agreement
    };

    return this.http.post<AgreementDetail>(url, req, { observe: 'response' });
  }

  public paymentTax(payload: PaymentTaxesRequest): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.taxes.tax_payment);

    return this.http.post<GenericResponse>(url, payload);
  }

  public searchBillBarcode(
    payload: SearchBillBarcodePayload
  ): Observable<SearchBillBarcodeResponse> {
    const url = urlBuilder.services(ENV.api.services.bills.barcode);
    return this.http.post<SearchBillBarcodeResponse>(url, payload);
  }
}
