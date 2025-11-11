import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { PaymentPayload } from '@modules/payments/payment-credits/entities/pay-loan.interface';
import {
  PaymentCredits,
  PaymentFetchFilter
} from '@modules/payments/payment-credits/entities/payment-credits.interface';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentCreditsService {
  constructor(private http: HttpClient) {}

  public fetchPaymentCredits(
    option: PaymentFetchFilter
  ): Observable<PaymentCredits> {
    let url = urlBuilder.services(ENV.api.services.payments.loans);
    url += '?own=' + option;

    return this.http.get<PaymentCredits>(url);
  }

  public pay(payload: PaymentPayload): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.payments.loans_pay);
    return this.http.post<GenericResponse>(url, payload);
  }
}
