import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlBuilder } from '../utils/url-builder';
import { environment as ENV } from '@environment';
import {
  FA2Payload,
  FA2PayloadResponse
} from '../entities/notifications/notification.entities';

@Injectable({
  providedIn: 'root'
})
export class FA2AuthService {
  private url = urlBuilder.services(ENV.api.services.security.secondFA);

  constructor(private http: HttpClient) {}

  public call2FAAuth(payload: FA2Payload): Observable<FA2PayloadResponse> {
    return this.http.post<FA2PayloadResponse>(this.url, payload);
  }
}
