import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import {
  DirectedPaymentPayload,
  DirectedPaymentResponse
} from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';
import { UpdateInstallmentsPayload } from '@modules/product-options/credit-movements/pages/update-installments/entities/update-installments.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CreditMovementsService {
  constructor(private http: HttpClient) {}

  public fetchPayments(productId: string): Observable<CreditMovement[]> {
    const url = urlBuilder.services(ENV.api.services.payments.payments_list, {
      product_id: productId
    });
    return this.http
      .get<{ data: CreditMovement[] }>(url)
      .pipe(map((response: { data: CreditMovement[] }) => response.data));
  }

  public directPayment(
    payload: DirectedPaymentPayload[]
  ): Observable<DirectedPaymentResponse[]> {
    const url = urlBuilder.services(
      ENV.api.services.payments.directed_payment_multiple
    );
    return this.http
      .post<{ directedPaymentList: DirectedPaymentResponse[] }>(url, {
        directedPaymentList: payload
      })
      .pipe(map((response) => response.directedPaymentList));
  }

  public updateInstallment(
    payload: UpdateInstallmentsPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(
      ENV.api.services.payments.update_installments
    );
    return this.http.put<GenericResponse>(url, payload);
  }
}
