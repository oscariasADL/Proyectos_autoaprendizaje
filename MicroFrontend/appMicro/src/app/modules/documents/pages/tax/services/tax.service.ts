import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '@environment';
import { urlBuilder } from '@commons/utils/url-builder';
import { Observable } from 'rxjs';

@Injectable()
export class TaxService {
  constructor(private http: HttpClient) {}

  public fetchTaxCertificate(year: number): Observable<any> {
    const url = urlBuilder.services(
      ENV.api.services.statements.tax.certificate,
      {
        year
      }
    );
    return this.http.get<string>(url, {
      responseType: 'text' as 'json',
      observe: 'response'
    });
  }
}
