import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Fee, FeePayload } from '@commons/entities/fee/fee.interface';

@Injectable()
export class FeeServiceMock {
  public fetchCost(payload: FeePayload): Observable<Fee> {
    return of();
  }
}
