import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  constructor(private http: HttpClient) {}

  public fetchParameter(entity: string, extension: string): Observable<any> {
    const url = urlBuilder.parameter(ENV.api.services.parameter, {
      entity,
      extension
    });

    return this.http.get<any>(url);
  }
}
