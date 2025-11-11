import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import {
  RegisterPayload,
  RegisterResponse
} from '@modules/auth/register/entities/register.interface';
import { throwErrorIfNecessary } from '@modules/auth/register/helpers/register.helper';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthStepPayload } from '../auth-steps/entities/auth-steps.interface';

@Injectable()
export class RegisterService {
  constructor(private http: HttpClient) {}

  public getRegisterDataByEnrollmentTypeAndExecutorSF(
    payload: AuthStepPayload,
    isEnabledBavvExecutorSF: boolean,
    isBiometricsEnrollment: boolean
  ): Observable<RegisterResponse> {
    return isBiometricsEnrollment
      ? this.runRegistrationWithBiometricsEnrollment(
          payload,
          isEnabledBavvExecutorSF
        )
      : this.runRegistration(payload, isEnabledBavvExecutorSF);
  }

  private runRegistration(
    payload: RegisterPayload,
    isEnabledBavvExecutorSF: boolean
  ): Observable<RegisterResponse> {
    const url = isEnabledBavvExecutorSF
      ? urlBuilder.services(ENV.api.services.enrollment.base_sf)
      : urlBuilder.services(ENV.api.services.enrollment.base);

    return this.http
      .post<RegisterResponse>(url, payload)
      .pipe(tap((data: RegisterResponse) => throwErrorIfNecessary(data)));
  }

  private runRegistrationWithBiometricsEnrollment(
    payload: RegisterPayload,
    isEnabledBavvExecutorSF: boolean
  ): Observable<RegisterResponse> {
    const url = isEnabledBavvExecutorSF
      ? urlBuilder.services(ENV.api.services.enrollment.biometrics_sf)
      : urlBuilder.services(ENV.api.services.enrollment.biometrics);

    return this.http
      .post<RegisterResponse>(url, payload)
      .pipe(tap((data: RegisterResponse) => throwErrorIfNecessary(data)));
  }
}
