import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { Movement } from '@commons/entities/product/movement.interface';
import { environment as ENV } from '@environment';
import {
  MovementsDetailPayload,
  MovementsDetailResponse
} from '@modules/movement/entities/movements-detail-payload.entity';
import { mapMovementsPayload } from '@modules/movement/mappers/movements.mapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MovementService {
  constructor(private http: HttpClient) {}

  public fetchMovements(): Observable<Movement[]> {
    const url = urlBuilder.services(ENV.api.services.base.movements);

    return this.http.get<Movement[]>(url);
  }

  public fetchMovementsDetail(
    _payload: MovementsDetailPayload
  ): Observable<MovementsDetailResponse> {
    const payload = mapMovementsPayload(_payload);
    const url = urlBuilder.services(ENV.api.services.base.movements_detail, {
      id: payload.id
    });

    let params = new HttpParams();
    Object.keys(payload.params).forEach(
      (key) => (params = params.set(key, payload.params[key]))
    );

    return this.http.get<any>(url, { params }).pipe(
      map((data) => {
        if (data?.hasOwnProperty('totalResults')) {
          return data;
        } else {
          return {
            results: data?.length > 0 ? data : [],
            totalResults: data?.length || 0
          };
        }
      })
    );
  }
}
