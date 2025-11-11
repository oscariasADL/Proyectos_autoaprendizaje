import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { Observable } from 'rxjs';
import {
  ActivationPayloadRequest,
  ActivationProduct,
  ActivationStatusDescription,
  SuspiciousTransaction,
  TemporaryBlockPayload
} from '../entities/security-media.interface';

@Injectable()
export class SecurityMediaActivationService {
  constructor(private http: HttpClient) {}

  public fetchActivations(): Observable<ActivationProduct[]> {
    const url = urlBuilder.services(ENV.api.services.base.activations);

    return this.http.get<ActivationProduct[]>(url);
  }

  public activateProduct(
    payload: ActivationPayloadRequest
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.base.activations);
    return this.http.post<GenericResponse>(url, payload);
  }

  public blockProduct(id: string): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.base.blocking);
    return this.http.post<GenericResponse>(url, {
      id
    });
  }

  public temporaryBlock(
    payload: TemporaryBlockPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.base.temporary_block);
    return this.http.post<GenericResponse>(url, payload);
  }

  public unblockProduct(
    product: ActivationProduct
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(
      product.status === ActivationStatusDescription.PREVENTIVE_BLOCK
        ? ENV.api.services.base.preventive_unblock
        : ENV.api.services.base.temporary_unblock
    );
    return this.http.post<GenericResponse>(url, {
      id: product.id
    });
  }

  public suspiciousTransaction(
    product: ActivationProduct
  ): Observable<HttpResponse<SuspiciousTransaction>> {
    const url = urlBuilder.services(
      ENV.api.services.base.suspicious_transaction,
      { id: product.id }
    );
    return this.http.get<SuspiciousTransaction>(url, {
      observe: 'response'
    });
  }
}
