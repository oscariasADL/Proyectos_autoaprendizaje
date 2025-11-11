import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import {
  DigitalDebitCard,
  DigitalDebitCardDetail,
  DigitalDebitCardCreatePayload,
  DigitalDebitCardEditPayload
} from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DigitalDebitCardService {
  constructor(private http: HttpClient) {}

  public createDigitalDebitCard(
    payload: DigitalDebitCardCreatePayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(
      ENV.api.services.management.digital_debit_card_create
    );
    return this.http.post<GenericResponse>(url, payload);
  }

  public editDigitalDebitCard(
    payload: DigitalDebitCardEditPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(
      ENV.api.services.management.digital_debit_card_edit
    );

    return this.http.post<GenericResponse>(url, payload);
  }

  public fetchDigitalDebitCards(): Observable<DigitalDebitCard[]> {
    const url = urlBuilder.services(
      ENV.api.services.management.digital_debit_card_list
    );
    return this.http
      .get<{ digitalDebitCardsByDocuments: DigitalDebitCard[] }>(url)
      .pipe(map((response) => response?.digitalDebitCardsByDocuments));
  }

  public fetchDigitalDebitCardDetail(
    relativeParentId: string
  ): Observable<DigitalDebitCardDetail> {
    const url = urlBuilder.services(
      ENV.api.services.management.digital_debit_card_detail
    );
    return this.http.post<DigitalDebitCardDetail>(url, {
      relativeParentId
    });
  }
}
