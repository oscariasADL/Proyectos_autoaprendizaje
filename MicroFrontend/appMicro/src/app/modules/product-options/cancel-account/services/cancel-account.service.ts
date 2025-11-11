import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { CancelAccountPayload } from '@modules/product-options/cancel-account/entities/cancel-account.interface';

@Injectable()
export class CancelAccountService {
  constructor(private http: HttpClient) {}

  public cancelAccount(
    payload: CancelAccountPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.base.cancel_account);
    return this.http.post<GenericResponse>(url, payload);
  }
}
