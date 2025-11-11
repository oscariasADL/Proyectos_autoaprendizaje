import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { SearchBillReferencePayload } from '@modules/payments/payment-services/entities/register-service.interface';
import {
  Contributor,
  PaymentSocialSecurityPayload,
  SocialSecurityPinPayload
} from '@modules/payments/payment-social-security/entities/social-security.interface';
import {
  fetchContributorAction,
  fetchSocialSecurityDataByPinAction,
  fetchSocialSecurityDataByReferenceAction,
  paySocialSecurityAction
} from '@modules/payments/payment-social-security/store/payment-social-security.actions';
import {
  contributorsSelector,
  workingContributorsSelector
} from '@modules/payments/payment-social-security/store/payment-social-security.selector';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentSocialSecurityFacade extends AppFacade {
  public contributors$: Observable<Contributor[]> = this.store.pipe(
    select(contributorsSelector)
  );

  public workingContributors$: Observable<boolean> = this.store.pipe(
    select(workingContributorsSelector)
  );

  public fetchContributor(): void {
    this.store.dispatch(fetchContributorAction());
  }

  public fetchSocialSecurityDataByPin(payload: SocialSecurityPinPayload): void {
    this.store.dispatch(fetchSocialSecurityDataByPinAction({ payload }));
  }

  public fetchSocialSecurityDataByReference(
    payload: SearchBillReferencePayload
  ): void {
    this.store.dispatch(fetchSocialSecurityDataByReferenceAction({ payload }));
  }

  public paySocialSecurity(
    payload: PaymentSocialSecurityPayload,
    data: AlertStepData
  ): void {
    this.store.dispatch(paySocialSecurityAction({ payload, data }));
  }
}
