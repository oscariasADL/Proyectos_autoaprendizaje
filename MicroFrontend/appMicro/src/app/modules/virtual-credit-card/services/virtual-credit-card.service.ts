import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment as ENV } from '@environment';
import { GenericResponse } from '@app/commons/entities/response/response.interface';
import { urlBuilder } from '@app/commons/utils/url-builder';
import {
  VirtualCreditCard,
  VirtualCreditCardCreatePayload,
  VirtualCreditCardDetail,
  VirtualCreditCardDetailPayload,
  VirtualCreditCardListPayload,
  VirtualCreditCardOperationPayload
} from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';

@Injectable()
export class VirtualCreditCardService {
  constructor(private http: HttpClient) {}

  public fetchVirtualCreditCards(
    payload: VirtualCreditCardListPayload
  ): Observable<VirtualCreditCard[]> {
    const url = urlBuilder.services(
      ENV.api.services.management_tcd_server.virtual_credit_card_list
    );
    return this.http
      .post<{ cards: VirtualCreditCard[] }>(url, payload)
      .pipe(map((response) => response?.cards));
  }

  public fetchVirtualCreditCardDetail(
    payload: VirtualCreditCardDetailPayload
  ): Observable<VirtualCreditCardDetail> {
    const url = urlBuilder.services(
      ENV.api.services.management_tcd_server.virtual_credit_card_detail
    );
    return this.http
      .post<{ cards: VirtualCreditCardDetail[] }>(url, payload)
      .pipe(
        map((response) => {
          if (
            response &&
            Array.isArray(response.cards) &&
            response.cards.length > 0
          ) {
            return response.cards[0];
          }
          return null;
        })
      );
  }

  public createVirtualCreditCard(
    payload: VirtualCreditCardCreatePayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(
      ENV.api.services.management_tcd_server.virtual_credit_card_create
    );
    return this.http.post<GenericResponse>(url, payload);
  }

  public editVirtualCreditCard(
    payload: VirtualCreditCardOperationPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(
      ENV.api.services.management_tcd_server.virtual_credit_card_modify
    );

    return this.http.post<GenericResponse>(url, payload);
  }

  public cancelVirtualCreditCard(
    payload: VirtualCreditCardOperationPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(
      ENV.api.services.management_tcd_server.virtual_credit_card_cancel
    );
    return this.http.post<GenericResponse>(url, payload);
  }

  public reissueVirtualCreditCard(
    payload: VirtualCreditCardOperationPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(
      ENV.api.services.management_tcd_server.virtual_credit_card_forward
    );
    return this.http.post<GenericResponse>(url, payload);
  }
}
