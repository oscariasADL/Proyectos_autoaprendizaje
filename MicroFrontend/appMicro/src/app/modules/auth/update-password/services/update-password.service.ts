import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { UpdatePasswordPayload } from '@modules/auth/update-password/entities/update-password.interface';
import { Observable } from 'rxjs';

@Injectable()
export class UpdatePasswordService {
  constructor(private http: HttpClient) {}

  public updatePassword(
    payload: UpdatePasswordPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(
      ENV.api.services.auth.change_expired_password
    );

    return this.http.post<GenericResponse>(url, payload);
  }
}
