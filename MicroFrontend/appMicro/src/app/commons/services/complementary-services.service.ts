import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { environment as ENV } from '@environment';
import {
  ToggleComplementaryServicesPayload,
  ToggleComplementaryServicesResponse
} from '@modules/security/security-complementary-services/entities/complementary-services.interface';

@Injectable({
  providedIn: 'root'
})
export class ComplementaryServicesService {
  constructor(private http: HttpClient) {}

  public getComplementaryServices(): Observable<GenericResponse> {
    const url = urlBuilder.services(
      ENV.api.services.management.complementary_services
    );
    return this.http.get<GenericResponse>(url);
  }

  public toggleComplementaryServices(
    payload: ToggleComplementaryServicesPayload,
    isEnabledBavvExecutorSF: boolean
  ): Observable<ToggleComplementaryServicesResponse> {
    const url = isEnabledBavvExecutorSF
      ? urlBuilder.services(ENV.api.services.core.complementary_services_sf)
      : urlBuilder.services(ENV.api.services.core.complementary_services);
    return this.http.post<ToggleComplementaryServicesResponse>(url, payload);
  }
}
