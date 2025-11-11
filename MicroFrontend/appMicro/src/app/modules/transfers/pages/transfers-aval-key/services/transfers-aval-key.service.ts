import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { Observable } from 'rxjs';
import { AccountAvalKey } from '@modules/transfers/pages/transfers-aval-key/entities/transfers-aval-key.interface';

@Injectable()
export class TransfersAvalKeyService {
  constructor(private http: HttpClient) {}

  public fetchAccountAvalKey(avalKey: string): Observable<AccountAvalKey> {
    const url = urlBuilder.services(
      ENV.api.services.transactions.transfers.accountAvalKey
    );
    return this.http.post<AccountAvalKey>(url, { spiKey: avalKey });
  }
}
