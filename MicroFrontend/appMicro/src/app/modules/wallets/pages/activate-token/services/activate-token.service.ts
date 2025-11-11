import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import {
  ActivateTokenPayload,
  LastTokenResponse
} from '@modules/wallets/pages/activate-token/entities/activate-token.interface';

@Injectable()
export class ActivateTokenService {
  constructor(private http: HttpClient) {}

  public fetchLastToken(): Observable<LastTokenResponse> {
    const url = urlBuilder.services(ENV.api.services.wallets.last_token);
    return this.http.post<LastTokenResponse>(url, {});
  }

  public activateToken(payload: ActivateTokenPayload) {
    const url = urlBuilder.services(ENV.api.services.wallets.activate_token);
    return this.http.post(url, payload);
  }
}
