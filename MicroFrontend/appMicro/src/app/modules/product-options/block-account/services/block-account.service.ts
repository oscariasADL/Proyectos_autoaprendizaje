import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { ActivationProduct } from '@modules/security/security-media-activation/entities/security-media.interface';
import { GenericResponse } from '@commons/entities/response/response.interface';

@Injectable({
  providedIn: 'root'
})
export class BlockAccountService {
  constructor(private http: HttpClient) {}

  public fetchProductMedias(): Observable<ActivationProduct[]> {
    const url = urlBuilder.services(ENV.api.services.base.activations);

    return this.http.get<ActivationProduct[]>(url);
  }

  public sendBlockAccount(payload: {
    relativeId: string;
    lockId: string;
  }): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.base.block_account);

    return this.http.post<GenericResponse>(url, payload);
  }
}
