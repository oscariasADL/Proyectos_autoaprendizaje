import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import {
  CASH_OUT_TYPE,
  WithdrawPayload
} from '@modules/withdraw/entities/withdraw.interface';
import { Observable } from 'rxjs';

@Injectable()
export class WithdrawService {
  constructor(private http: HttpClient) {}

  public withdraw(payload: WithdrawPayload): Observable<GenericResponse> {
    const url = urlBuilder.services(
      `${ENV.api.services.transactions.withdraw}/${
        CASH_OUT_TYPE[payload.cashoutType]
      }`
    );

    return this.http.post<GenericResponse>(url, payload);
  }
}
