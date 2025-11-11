import { Injectable } from '@angular/core';
import { SearchBillReferencePayload } from '@modules/payments/payment-services/entities/register-service.interface';
import {
  Contributor,
  PaymentSocialSecurityPayload,
  SocialSecurityPinPayload
} from '@modules/payments/payment-social-security/entities/social-security.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PaymentSocialSecurityFacadeMock extends AppFacadeMock {
  public contributors$: Observable<Contributor[]> = new BehaviorSubject([]);

  public workingContributors$: Observable<boolean> = new BehaviorSubject(false);

  public fetchContributor(): void {}

  public fetchSocialSecurityDataByPin(
    payload: SocialSecurityPinPayload
  ): void {}

  public fetchSocialSecurityDataByReference(
    payload: SearchBillReferencePayload
  ): void {}

  public paySocialSecurity(
    payload: PaymentSocialSecurityPayload,
    data: AlertStepData
  ): void {}
}
