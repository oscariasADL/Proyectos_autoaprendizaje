import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { Balance } from '@commons/entities/product/balance.interface';
import { environment as ENV } from '@environment';
import { ProductNickname } from '@modules/product/entities/product-nickname.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppFacade } from '@app/app.facade';
import { ProductSpiUserKey } from '@modules/product/entities/product-spi-user-key';
import { ProductSpiConsentResponse } from '../entities/product-spi.interface';

import {
  TxServiceResponse,
  SPITransactionEvent
} from '@app/modules/home/entities/spi-channel.entities';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient, private appFacade: AppFacade) {}

  public fetchBalance(onlyCreditCard: boolean = false): Observable<Balance[]> {
    let url =
      urlBuilder.services(ENV.api.services.base.balance_without_detail) +
      '?hasCreditProducts=' +
      (this.appFacade.userData$.currentValue()?.dataBasicClientDto
        ?.hasCreditProducts ?? false);
    if (onlyCreditCard) {
      url += '&onlyCreditCard=true';
    }
    return this.http
      .get<{ data: Balance[] }>(url)
      .pipe(map((response: { data: Balance[] }) => response?.data));
  }

  public fetchNicknames(): Observable<ProductNickname[]> {
    const url = urlBuilder.services(ENV.api.services.base.nicknames);
    return this.http.get<ProductNickname[]>(url);
  }

  public fetchSpiUserKeys(): Observable<ProductSpiUserKey[]> {
    const url = urlBuilder.services(ENV.api.services.base.spiUserKeys);
    return this.http.post<ProductSpiUserKey[]>(url, {});
  }

  public fetchSpiAuthorization(): Observable<ProductSpiConsentResponse> {
    const url = urlBuilder.services(ENV.api.services.base.spiAuthorization);
    return this.http.post<ProductSpiConsentResponse>(url, {});
  }

  public acceptSpiConsent(): Observable<any> {
    const url = urlBuilder.services(ENV.api.services.base.acceptSpiConsent);
    return this.http.post<any>(url, {});
  }

  public rsaSpiTransaction(
    payload: SPITransactionEvent
  ): Observable<TxServiceResponse> {
    const url = urlBuilder.services(ENV.api.services.transactions.rsa_spi);
    return this.http.post<TxServiceResponse>(url, payload);
  }

  public rsaSpiBlockTransaction(payload: any): Observable<TxServiceResponse> {
    const url = urlBuilder.services(
      ENV.api.services.transactions.rsa_spi_block
    );
    return this.http.post<TxServiceResponse>(url, payload);
  }
}
