import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import {
  NotificationPayload,
  NotificationResponse
} from '@commons/entities/notifications/notification.entities';
import { environment as ENV } from '@environment';
import { TransfiyaPayload } from '@modules/transfers/entities/transfers.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransfiyaAuthorizationItem } from '../entities/notifications/transfiya.entities';
import { GenericResponse } from '../entities/response/response.interface';
import {
  PushNotificationApprovalPayload,
  PushNotificationRejectPayload
} from '@app/modules/notifications/entities/push-notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  public fetchTransfiyaConsignmentsList(): Observable<
    TransfiyaAuthorizationItem[]
  > {
    const url = urlBuilder.services(
      ENV.api.services.transfiya.consignments_list
    );
    return this.http
      .get<{ authorizations: TransfiyaAuthorizationItem[] }>(url)
      .pipe(
        map(({ authorizations: items }) =>
          items.map((item) => ({
            ...item,
            targetNumber: item.targetNumber.replace(/\W/g, '').slice(-10),
            isRequest: false
          }))
        )
      );
  }

  public fetchTransfiyaRequestsList(): Observable<
    TransfiyaAuthorizationItem[]
  > {
    const url = urlBuilder.services(ENV.api.services.transfiya.requests_list);
    return this.http
      .get<{ authorizations: TransfiyaAuthorizationItem[] }>(url)
      .pipe(
        map(({ authorizations: items }) =>
          items.map((item) => ({
            ...item,
            targetNumber: item.targetNumber.replace(/\W/g, '').slice(-10),
            isRequest: true
          }))
        )
      );
  }

  public acceptTransfiyaAuthorization(
    payload: TransfiyaPayload,
    isRequest: boolean
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(
      isRequest
        ? ENV.api.services.transfiya.authorize_transfer
        : ENV.api.services.transfiya.consignments_allow
    );
    return this.http.post<GenericResponse>(url, payload);
  }

  public rejectTransfiyaAuthorization(
    payload: TransfiyaPayload,
    isRequest: boolean
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(
      isRequest
        ? ENV.api.services.transfiya.refuse_transfer
        : ENV.api.services.transfiya.consignments_allow
    );
    return this.http.post<GenericResponse>(url, payload);
  }

  public fetchNotifications(
    payload: NotificationPayload
  ): Observable<NotificationResponse> {
    const url = urlBuilder.services(ENV.api.services.notifications.list);
    return this.http.post<NotificationResponse>(url, payload);
  }

  public approvePushNotification(
    payload: PushNotificationApprovalPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.notifications.approve);
    return this.http.post<GenericResponse>(url, payload);
  }

  public rejectPushNotification(
    payload: PushNotificationRejectPayload
  ): Observable<GenericResponse> {
    const url = urlBuilder.services(ENV.api.services.notifications.reject);
    return this.http.post<GenericResponse>(url, payload);
  }
}
