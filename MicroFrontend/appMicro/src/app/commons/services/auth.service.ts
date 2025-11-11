import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import {
  HttpHeadersData,
  HttpHeadersName
} from '@commons/constants/header.constants';
import { PingResponse } from '@commons/entities/auth/ping.entities';
import { environment as ENV } from '@environment';
import { LoginUserPayload } from '@modules/auth/login/entities/login-user-payload.interface';
import { LoginUserResponse } from '@modules/auth/login/entities/login-user-response.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { LogManagerService } from './log-manager-service/log-manager-service.service';
import { LogSeverity } from './log-manager-service/entities/log-manager-service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private logManagerService: LogManagerService
  ) {}

  public login(credentials: LoginUserPayload): Observable<LoginUserResponse> {
    const url = urlBuilder.services(ENV.api.services.auth.login);
    const payload = {
      documentType: credentials.typeDocument,
      documentNumber: credentials.document,
      password: credentials.password,
      deviceName: credentials.deviceName,
      deviceSerial: credentials.deviceSerial
    };

    return this.http.post<LoginUserResponse>(url, payload);
  }

  public logout(): Observable<boolean> {
    const url = urlBuilder.services(ENV.api.services.auth.logout);

    return this.http.post(url, {}).pipe(
      map(() => true),
      catchError(() => of(true))
    );
  }

  public fetchInterchangeKey(): Observable<string> {
    const url = urlBuilder.services(ENV.api.services.security.interchange);

    return this.http
      .get<{ publicKey: string }>(url)
      .pipe(map((response: { publicKey: string }) => response.publicKey));
  }

  public getInterchangeKey(
    sessionId: string,
    deviceSerial: string
  ): Observable<string> {
    const url = urlBuilder.services(ENV.api.services.security.interchange);

    const headers = new HttpHeaders({
      [HttpHeadersName.CONTENT_TYPE]: HttpHeadersData.CONTENT_TYPE,
      [HttpHeadersName.X_SESSION_ID]: sessionId,
      [HttpHeadersName.X_DEVICE_SERIAL]: deviceSerial
    });
    const logMessageDetails = {
      severity: LogSeverity.INFO,
      fileName: 'bootstrap.effects.ts',
      functionName: 'initInterchangeKeyEffect$',
      customMessage: `Added headers [X_SESSION_ID]=${!!sessionId} [X_DEVICE_SERIAL]=${deviceSerial}`
    };
    this.logManagerService.log(logMessageDetails);
    return this.http
      .post<void>(
        url,
        {},
        {
          headers,
          observe: 'response'
        }
      )
      .pipe(
        retry(10),
        map((response: HttpResponse<void>) =>
          response.headers.get(HttpHeadersName.X_SESSION_HASH)
        )
      );
  }

  public fetchPing(): Observable<PingResponse> {
    const url = urlBuilder.services(ENV.api.services.auth.ping);
    return this.http.get<PingResponse>(url);
  }
}
