import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBuilder } from '@commons/utils/url-builder';
import { environment as ENV } from '@environment';
import {
  SearchBillReferencePayload,
  SearchBillReferenceResponse
} from '@modules/payments/payment-services/entities/register-service.interface';
import {
  Contributor,
  PaymentSocialSecurityPayload,
  PaymentSocialSecurityResponse,
  SocialSecurityPinPayload,
  SocialSecurityPinResponse
} from '@modules/payments/payment-social-security/entities/social-security.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PaymentSocialSecurityService {
  constructor(private http: HttpClient) {}

  public fetchContributors(): Observable<Contributor[]> {
    const url = urlBuilder.services(ENV.api.services.bills.social_security);

    return this.http
      .get<{ contributors: Contributor[] }>(url)
      .pipe(map((data: { contributors: Contributor[] }) => data.contributors));
  }

  public paySocialSecurity(
    payload: PaymentSocialSecurityPayload
  ): Observable<PaymentSocialSecurityResponse> {
    const url = urlBuilder.services(ENV.api.services.bills.social_security);

    return this.http.post<PaymentSocialSecurityResponse>(url, payload);
  }

  public fetchSocialSecurityDataByPin(
    payload: SocialSecurityPinPayload
  ): Observable<SocialSecurityPinResponse> {
    const url = urlBuilder.services(ENV.api.services.bills.social_security_pin);
    return this.http.post<SocialSecurityPinResponse>(url, payload);
  }

  public fetchSocialSecurityDataByReference(
    payload: SearchBillReferencePayload
  ): Observable<SearchBillReferenceResponse> {
    const url = urlBuilder.services(
      ENV.api.services.bills.search_bill_reference
    );
    return this.http.post<SearchBillReferenceResponse>(url, payload);
  }
}
