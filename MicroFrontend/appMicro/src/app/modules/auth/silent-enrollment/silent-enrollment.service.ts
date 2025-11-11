import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  SilentEnrollmentPayload,
  SilentEnrollmentResponse
} from './entities/silent-enrollment.interface';
import { throwSilentEnrollmentErrorIfNecessary } from './helpers/silent-enrollment.helper';

@Injectable()
export class SilentEnrollmentService {
  constructor(private http: HttpClient) {}

  public runSilentEnrollment(
    payload: SilentEnrollmentPayload
  ): Observable<SilentEnrollmentResponse> {
    const url = urlBuilder.services(ENV.api.services.enrollment.silent);

    return this.http
      .post<SilentEnrollmentResponse>(url, payload)
      .pipe(
        tap((data: SilentEnrollmentResponse) =>
          throwSilentEnrollmentErrorIfNecessary(data)
        )
      );
  }
}
