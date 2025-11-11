import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { RechargePayload } from '@modules/product-options/recharges/entities/recharges.interface';
import { Observable } from 'rxjs';

@Injectable()
export class RechargesService {
  constructor(private http: HttpClient) {}

  public recharge(payload: RechargePayload): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.payments.mobile_recharge);

    return this.http.post<GenericResponse>(url, payload);
  }
}
