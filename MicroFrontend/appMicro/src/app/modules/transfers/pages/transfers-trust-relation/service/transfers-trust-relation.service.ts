import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { Product } from '@commons/entities/product/product.interface';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { environment as ENV } from '@environment';
import {
  RemoveTrustRelationPayload,
  TrustRelationItem
} from '@modules/transfers/pages/transfers-trust-relation/entities/transfer-trust-relation.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransfersTrustRelationService {
  constructor(private http: HttpClient) {}

  public fetchTrustRelations(
    product: Product
  ): Observable<TrustRelationItem[]> {
    const url = urlBuilder.services(
      ENV.api.services.transfiya.trust_relationship_list
    );
    const { id: relativeId } = product;
    return this.http
      .post<{ trustRelationship: TrustRelationItem[] }>(url, { relativeId })
      .pipe(map((data) => data?.trustRelationship));
  }

  public removeTrustRelation(
    payload: RemoveTrustRelationPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(
      ENV.api.services.transfiya.trust_relationship_remove
    );

    return this.http.post<GenericResponse>(url, payload);
  }
}
