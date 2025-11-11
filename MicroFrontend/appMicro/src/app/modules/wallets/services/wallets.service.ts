import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  CardDetail,
  CreateWalletResponse,
  PrepareCardEnrollmentDataPayload,
  PrepareCardEnrollmentDataResponse
} from '@modules/wallets/entities/wallets.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { map } from 'rxjs/operators';

@Injectable()
export class WalletsService {
  constructor(private http: HttpClient) {}

  public createWallet(): Observable<CreateWalletResponse> {
    const url = urlBuilder.services(ENV.api.services.wallets.createWallet);
    return this.http.post<CreateWalletResponse>(url, null);
  }

  public fetchCardList(): Observable<CardDetail[]> {
    const url = urlBuilder.services(ENV.api.services.wallets.card_list);
    return this.http
      .get<{ cardAcctId: CardDetail[] }>(url)
      .pipe(map((res) => res?.cardAcctId ?? []));
  }

  public fetchPrepareCardEnrollmentData(
    payload: PrepareCardEnrollmentDataPayload
  ): Observable<PrepareCardEnrollmentDataResponse> {
    const url = urlBuilder.services(
      ENV.api.services.wallets.prepare_digitization
    );
    return this.http.post<PrepareCardEnrollmentDataResponse>(url, payload);
  }
}
