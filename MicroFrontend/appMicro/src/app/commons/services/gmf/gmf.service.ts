import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GMFPayload, GMFData } from '@app/commons/entities/gmf/gmf.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GmfService {
  constructor(private http: HttpClient) {}

  public fetchGMF(payload: GMFPayload): Observable<GMFData> {
    const url = urlBuilder.services(ENV.api.services.base.gmf);

    return this.http.post<GMFData>(url, payload);
  }
}
