import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GenericResponse } from '@commons/entities/response/response.interface';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import { removeProperties } from '@commons/utils/util';
import {
  PushNotificationRegisterPayload,
  TogglePushNotificationsType
} from '@commons/entities/notifications/push-notification-register.entities';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationRegisterService {
  constructor(private http: HttpClient) {}

  public togglePushNotifications(
    payload: PushNotificationRegisterPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.notifications.toggle);

    return payload.action === TogglePushNotificationsType.ENABLE
      ? this.http.post<GenericResponse>(
          url,
          removeProperties(payload, ['action'])
        )
      : this.http.delete<GenericResponse>(url);
  }
}
