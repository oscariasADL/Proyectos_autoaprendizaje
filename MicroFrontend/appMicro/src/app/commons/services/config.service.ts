import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '@environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigResponse } from '../entities/config/config.entities';
import { urlBuilder } from '../utils/url-builder';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  public fetchConfig(): Observable<ConfigResponse> {
    const url = urlBuilder.services(ENV.api.services.management.config);
    return this.http.get<ConfigResponse>(url);
  }

  public fetchIP(): Observable<any> {
    const url = urlBuilder.services(ENV.api.services.management.ip);
    return this.http
      .get(url, {
        responseType: 'text' as 'json',
        observe: 'response'
      })
      .pipe(
        map((res) => res.body),
        catchError(() => of(null))
      );
  }
}
