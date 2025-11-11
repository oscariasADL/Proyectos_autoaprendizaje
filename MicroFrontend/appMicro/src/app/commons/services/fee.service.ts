import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DEFAULT_FEE, Fee, FeePayload } from '../entities/fee/fee.interface';

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  constructor(private http: HttpClient) {}

  public fetchCost(payload: FeePayload): Observable<Fee> {
    const url = urlBuilder.services(ENV.api.services.base.fees);

    return this.http.post<{ currentAmount: Fee }>(url, payload).pipe(
      map(
        (response: { currentAmount: Fee }) =>
          response?.currentAmount || DEFAULT_FEE
      ),
      catchError(() => of(DEFAULT_FEE))
    );
  }
}
