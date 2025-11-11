import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { USE_QUOTA_INSTALLMENTS_TYPE } from '@modules/product-options/use-quota/constants/use-quota.constants';
import {
  UseQuotaInstallmentsResponse,
  UseQuotaPayload
} from '@modules/product-options/use-quota/entities/use-quota.interface';
import { Observable } from 'rxjs';

@Injectable()
export class UseQuotaService {
  constructor(private http: HttpClient) {}

  public useQuota(payload: UseQuotaPayload): Observable<SuccessResponse> {
    const url = urlBuilder.services(ENV.api.services.transactions.use_quota);
    return this.http.post<SuccessResponse>(url, payload);
  }

  public getInstallments(
    account_id: string
  ): Observable<UseQuotaInstallmentsResponse> {
    const url =
      urlBuilder.services(ENV.api.services.payments.installments, {
        account_id
      }) +
      '?type=' +
      USE_QUOTA_INSTALLMENTS_TYPE;

    return this.http.get<UseQuotaInstallmentsResponse>(url);
  }
}
