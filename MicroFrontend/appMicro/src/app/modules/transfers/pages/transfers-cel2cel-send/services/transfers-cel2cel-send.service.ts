import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransfersCel2celSendService {
  constructor(private http: HttpClient) {}

  public fetchTowardProductsByPhoneNumber(phone: string): Observable<any> {
    const url = urlBuilder.services(
      ENV.api.services.transactions.transfers.avvPhoneGetProductsByPhoneNumber
    );

    return this.http
      .post(url, { phone })
      .pipe(map((response: any) => response?.data));
  }
}
