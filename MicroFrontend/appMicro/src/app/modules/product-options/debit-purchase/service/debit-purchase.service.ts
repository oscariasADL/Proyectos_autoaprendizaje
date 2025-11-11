import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { DEBIT_PURCHASE_INSTALLMENTS_TYPE } from '@modules/product-options/debit-purchase/constants/debit-purchase.constants';
import { Observable } from 'rxjs';
import {
  DebtPurchaseInstallmentsPayload,
  DebtPurchasePayload,
  RatesResponse
} from '../entities/debit-purchase.interface';

@Injectable()
export class DebitPurchaseService {
  constructor(private http: HttpClient) {}

  public debitPurchase(
    payload: DebtPurchasePayload
  ): Observable<SuccessResponse> {
    const url = urlBuilder.services(ENV.api.services.payments.debt_purchase);
    return this.http.post<SuccessResponse>(url, payload);
  }

  public getLOCInstallments(
    account_id: string
  ): Observable<DebtPurchaseInstallmentsPayload> {
    const url =
      urlBuilder.services(ENV.api.services.payments.installments, {
        account_id
      }) +
      '?type=' +
      DEBIT_PURCHASE_INSTALLMENTS_TYPE;

    return this.http.get<DebtPurchaseInstallmentsPayload>(url);
  }

  public getRates(productId: string): Observable<RatesResponse> {
    const url = urlBuilder.services(
      ENV.api.services.payments.debt_purchase_rate,
      { relative_id: productId }
    );
    return this.http.get<RatesResponse>(url);
  }
}
