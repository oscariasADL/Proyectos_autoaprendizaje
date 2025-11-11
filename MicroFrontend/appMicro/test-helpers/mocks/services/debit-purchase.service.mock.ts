import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import {
  DebtPurchaseInstallmentsPayload,
  DebtPurchasePayload,
  RatesResponse
} from '@modules/product-options/debit-purchase/entities/debit-purchase.interface';
import { Observable, of } from 'rxjs';

@Injectable()
export class DebitPurchaseServiceMock {
  constructor(private http: HttpClient) {}

  public debitPurchase(
    payload: DebtPurchasePayload
  ): Observable<SuccessResponse> {
    return of();
  }

  public getLOCInstallments(
    account_id: string
  ): Observable<DebtPurchaseInstallmentsPayload> {
    return of();
  }

  public getRates(productId: string): Observable<RatesResponse> {
    return of();
  }
}
