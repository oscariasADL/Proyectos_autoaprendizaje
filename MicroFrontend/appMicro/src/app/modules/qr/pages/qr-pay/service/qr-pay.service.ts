import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { QrData } from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import {
  QrCancelPayload,
  QrPayAccountPayload,
  QrPayPayload
} from '@modules/qr/pages/qr-pay/entities/qr-pay.interface';
import {
  QrPaymentMethodData,
  QrPaymentMethods
} from '@modules/qr/pages/qr-pay/entities/qr-payment-method.interface';
import { Observable } from 'rxjs';
import {
  SearchBusinessesPayload,
  SearchBusinessResponse
} from '@modules/qr/pages/qr-pay/entities/qr-pay.interface';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';

@Injectable()
export class QrPayService {
  constructor(private http: HttpClient) {}

  public parseQR(metadata: string): Observable<QrData> {
    const url = urlBuilder.services(ENV.api.services.qr.code);
    return this.http.post<QrData>(url, { metadata });
  }

  public payQR(payload: QrPayPayload): Observable<SuccessResponse> {
    const url = urlBuilder.services(ENV.api.services.qr.payment);
    return this.http.post<SuccessResponse>(url, payload);
  }

  public payQrAccount(
    payload: QrPayAccountPayload
  ): Observable<SuccessResponse> {
    const url = urlBuilder.services(ENV.api.services.qr.payment_dale);
    return this.http.post<SuccessResponse>(url, payload);
  }

  public cancelQR(payload: QrCancelPayload): Observable<SuccessResponse> {
    const url = urlBuilder.services(ENV.api.services.qr.payment);
    return this.http.put<SuccessResponse>(url, payload);
  }

  public paymentMethods(): Observable<QrPaymentMethods> {
    const url = urlBuilder.services(ENV.api.services.products.payment_methods);
    return this.http.get<QrPaymentMethods>(url);
  }

  public paymentMethodQRData(
    referenceLabel: string
  ): Observable<QrPaymentMethodData> {
    const url = urlBuilder.services(ENV.api.services.qr.payment_method, {
      reference_label: referenceLabel
    });
    return this.http.get<QrPaymentMethodData>(url);
  }

  public searchBusiness(
    payload: SearchBusinessesPayload
  ): Observable<SearchBusinessResponse> {
    const url = urlBuilder.services(ENV.api.services.qr.search_business);
    return this.http.post<SearchBusinessResponse>(url, payload);
  }

  public fetchAccountSpiUserKey(
    avalKey: string
  ): Observable<TransferSpiUserKey> {
    const url = urlBuilder.services(
      ENV.api.services.transactions.transfers.spiKeyData
    );
    return this.http.post<TransferSpiUserKey>(url, { spiKey: avalKey });
  }
}
