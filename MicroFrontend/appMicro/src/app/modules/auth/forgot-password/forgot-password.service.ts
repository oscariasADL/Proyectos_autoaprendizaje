import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse
} from '@modules/auth/forgot-password/entities/forgot-password.interface';
import { throwForgotPasswordErrorIfNecessary } from '@modules/auth/forgot-password/helpers/forgot-password.helper';

@Injectable()
export class ForgotPasswordService {
  constructor(private http: HttpClient) {}

  public getForgotPasswordData(
    payload: ForgotPasswordPayload,
    options: {
      isBiometrics: boolean;
      isEnabledBavvExecutorSF: boolean;
    }
  ): Observable<ForgotPasswordResponse> {
    const { isBiometrics, isEnabledBavvExecutorSF } = options;

    const url = this.getForgotPasswordUrl(
      isBiometrics,
      isEnabledBavvExecutorSF
    );

    return this.http
      .post<ForgotPasswordResponse>(url, payload)
      .pipe(
        tap((data: ForgotPasswordResponse) =>
          throwForgotPasswordErrorIfNecessary(data, isBiometrics)
        )
      );
  }

  private getForgotPasswordUrl(
    isBiometrics: boolean,
    isExecutorSF: boolean
  ): string {
    const service = ENV.api.services.management;

    if (isBiometrics) {
      return urlBuilder.services(
        isExecutorSF ? service.biometrics_sf : service.biometrics
      );
    }

    return urlBuilder.services(
      isExecutorSF ? service.forgot_password_sf : service.forgot_password
    );
  }
}
