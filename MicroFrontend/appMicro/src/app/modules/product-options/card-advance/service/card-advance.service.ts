import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { CardAdvancePayload } from '@modules/product-options/card-advance/entities/card-advance.interface';
import { Observable } from 'rxjs';

@Injectable()
export class CardAdvanceService {
  constructor(private http: HttpClient) {}

  public cardAdvance(payload: CardAdvancePayload): Observable<SuccessResponse> {
    const url = urlBuilder.services(ENV.api.services.transactions.card_advance);
    return this.http.post<SuccessResponse>(url, payload);
  }
}
