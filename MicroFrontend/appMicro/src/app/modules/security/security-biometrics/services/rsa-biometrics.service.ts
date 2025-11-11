import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@app/commons/entities/response/response.interface';
import { urlBuilder } from '@app/commons/utils/url-builder';
import { CustomFacts } from '@app/modules/product-options/recharges/entities/recharges.interface';
import { environment as ENV } from '@environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RsaBiometricsService {
  constructor(private http: HttpClient) {}
  public callRSABiometrics(): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.auth.rsa_biometrics);

    return this.http.post<GenericResponse>(url, {});
  }
}
