import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { DefaultAccount } from '@modules/transfers/pages/transfers-default-account/entities/transfers-default-account.entities';
import { GenericResponse } from '@commons/entities/response/response.interface';

@Injectable()
export class TransfersAccountDefaultService {
  constructor(private http: HttpClient) {}

  public fetchDefaultAccount(): Observable<DefaultAccount> {
    const url = urlBuilder.services(ENV.api.services.transfiya.default_account);
    return this.http.post<DefaultAccount>(url, {});
  }

  public deleteDefaultAccount(): Observable<GenericResponse> {
    const url = urlBuilder.services(
      ENV.api.services.transfiya.default_account_delete
    );
    return this.http.post<GenericResponse>(url, {});
  }
}
