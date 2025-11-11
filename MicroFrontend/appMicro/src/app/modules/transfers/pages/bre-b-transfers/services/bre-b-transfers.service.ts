import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as ENV } from '@environment';
import { urlBuilder } from '@commons/utils/url-builder';
import {
  AddSpiContactPayload,
  SpiContact,
  UpdateSpiContactPayload
} from '@modules/transfers/pages/bre-b-transfers/entities/bre-b-transfers.interface';
import { TransferSpiUserKey } from '@commons/entities/transfers/transfers-spi-key.interface';

@Injectable()
export class BreBTransfersService {
  constructor(private http: HttpClient) {}

  public fetchSpiKeyData(spiKey: string): Observable<TransferSpiUserKey> {
    const url = urlBuilder.services(
      ENV.api.services.transactions.transfers.spiKeyData
    );
    return this.http.post<TransferSpiUserKey>(url, { spiKey });
  }

  public addSpiContact(payload: AddSpiContactPayload): Observable<void> {
    const url = urlBuilder.services(ENV.api.services.contact.spi.add_contact);
    return this.http.post<void>(url, payload);
  }

  public updateSpiContact(payload: UpdateSpiContactPayload): Observable<void> {
    const url = urlBuilder.services(
      ENV.api.services.contact.spi.update_contact
    );
    return this.http.post<void>(url, payload);
  }

  public fetchSpiContact(contactKey: string): Observable<SpiContact> {
    const url = urlBuilder.services(ENV.api.services.contact.spi.contact);
    return this.http.post<SpiContact>(url, { contactKey });
  }
}
