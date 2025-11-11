import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { environment as ENV } from '@environment';
import { VerifyPasswordPayload } from '@modules/security/security-biometrics/entities/security-biometrics.interface';
import { Observable } from 'rxjs';

@Injectable()
export class SecurityBiometricsService {
  constructor(private http: HttpClient) {}

  public verifyPassword(
    payload: VerifyPasswordPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.auth.identity);

    return this.http.post<GenericResponse>(url, payload);
  }
}
