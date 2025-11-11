import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { environment as ENV } from '@environment';
import {
  CdtRenewalRequest,
  CdtRenewalResponse
} from '@modules/product-options/cdt-renewal/entities/cdt-renewal.entity';
import { Observable } from 'rxjs';

@Injectable()
export class CdtRenewalService {
  constructor(private http: HttpClient) {}

  public fetchAccountDetails(id: string): Observable<CdtRenewalResponse> {
    const url = urlBuilder.services(ENV.api.services.management.cdt_details);

    return this.http.post<CdtRenewalResponse>(url, { productId: id });
  }

  public renewalCDT(payload: CdtRenewalRequest): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.management.cdt_renewal);

    return this.http.post<GenericResponse>(url, payload);
  }

  public cancelCDT(payload: CdtRenewalRequest): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.management.cdt_cancel);

    return this.http.post<GenericResponse>(url, payload);
  }
}
