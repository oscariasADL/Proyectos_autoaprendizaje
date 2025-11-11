import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { removeProperties } from '@commons/utils/util';
import { environment as ENV } from '@environment';
import {
  SecurityNotificationsType,
  ToggleSecurityNotificationsPayload
} from '@modules/security/security-notifications/entities/security-notifications.interface';
import { Observable } from 'rxjs';

@Injectable()
export class SecurityNotificationsService {
  constructor(private http: HttpClient) {}

  public toggleSecurityNotifications(
    payload: ToggleSecurityNotificationsPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.notifications.toggle);

    return payload.action === SecurityNotificationsType.ENABLE
      ? this.http.post<GenericResponse>(
          url,
          removeProperties(payload, ['action'])
        )
      : this.http.delete<GenericResponse>(url);
  }
}
