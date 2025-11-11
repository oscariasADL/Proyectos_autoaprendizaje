import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import {
  UseQuotaInstallmentsResponse,
  UseQuotaPayload
} from '@modules/product-options/use-quota/entities/use-quota.interface';
import { Observable, of } from 'rxjs';

@Injectable()
export class UseQuotaServiceMock {
  constructor(private http: HttpClient) {}

  public useQuota(payload: UseQuotaPayload): Observable<SuccessResponse> {
    return of();
  }

  public getInstallments(
    account_id: string
  ): Observable<UseQuotaInstallmentsResponse> {
    return of();
  }
}
