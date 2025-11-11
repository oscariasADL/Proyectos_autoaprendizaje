import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { ChangePasswordPayload } from '@modules/change-password/entities/change-password.entities';
import { Observable } from 'rxjs';

@Injectable()
export class ChangePasswordService {
  constructor(private http: HttpClient) {}

  public changePassword(
    payload: ChangePasswordPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(
      ENV.api.services.management.change_password
    );
    return this.http.put<GenericResponse>(url, payload);
  }
}
