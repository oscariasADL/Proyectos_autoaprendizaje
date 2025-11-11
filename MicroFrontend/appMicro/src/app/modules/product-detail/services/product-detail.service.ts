import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MovementsDetailPayload,
  MovementsDetailResponse
} from '../../movement/entities/movements-detail-payload.entity';
import { ProductDetail } from '../entities/product-detail.entity';

@Injectable()
export class ProductDetailService {
  constructor(private http: HttpClient) {}

  public fetchProductDetail(id: string): Observable<ProductDetail> {
    const url = urlBuilder.services(ENV.api.services.base.account_detail, {
      id
    });
    return this.http.get<ProductDetail>(url);
  }

  public fetchProductPayrollAdvance(number: string): Observable<any> {
    const url = urlBuilder.services(ENV.api.services.base.payroll_advance, {
      number
    });
    return this.http.post<any>(url, { numberProduct: number });
  }

  public fetchProductPayrollAdvanceConfirm(
    number: string,
    amount: number
  ): Observable<any> {
    const url = urlBuilder.services(
      ENV.api.services.base.payroll_advance_confirm,
      {
        number
      }
    );
    return this.http.post<any>(url, { numberProduct: number, amount: amount });
  }

  public fetchMovementsDetail(
    payload: MovementsDetailPayload
  ): Observable<MovementsDetailResponse> {
    const url = urlBuilder.services(ENV.api.services.base.movements_detail, {
      id: payload.id
    });

    let params = new HttpParams();
    Object.keys(payload.params).forEach(
      (key) => (params = params.set(key, payload.params[key]))
    );

    return this.http.get<any>(url, { params }).pipe(
      map((data) => {
        if (data.hasOwnProperty('totalResults')) {
          return data;
        } else {
          return {
            results: data,
            totalResults: data.length
          };
        }
      })
    );
  }
}
