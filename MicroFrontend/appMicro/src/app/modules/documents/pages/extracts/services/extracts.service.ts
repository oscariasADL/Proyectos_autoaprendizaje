import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import {
  ExtractPayload,
  ExtractsPeriod
} from '@modules/documents/pages/extracts/entities/extracts.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExtractsService {
  constructor(private http: HttpClient) {}

  public fetchPeriods(id: string): Observable<ExtractsPeriod[]> {
    const url = urlBuilder.services(
      ENV.api.services.statements.extracts.period,
      {
        product_id: id
      }
    );

    return this.http
      .get<{ periods: ExtractsPeriod[] }>(url)
      .pipe(map((data: { periods: ExtractsPeriod[] }) => data.periods));
  }

  public fetchExtract(data: ExtractPayload): Observable<any> {
    const url = urlBuilder.services(ENV.api.services.statements.extracts.file);

    return this.http.post<string>(url, data, {
      responseType: 'text' as 'json',
      observe: 'response'
    });
  }
}
