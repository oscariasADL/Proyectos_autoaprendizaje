import { Injectable } from '@angular/core';
import { PaymentPayload } from '@modules/payments/payment-credits/entities/pay-loan.interface';
import {
  PaymentCredit,
  PaymentCredits,
  PaymentFetchFilter
} from '@modules/payments/payment-credits/entities/payment-credits.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PaymentCreditsFacadeMock extends AppFacadeMock {
  public payments$: Observable<PaymentCredits> = new BehaviorSubject(null);

  public paymentsWorking$: Observable<boolean> = new BehaviorSubject(null);

  public paymentsCompleted$: Observable<boolean> = new BehaviorSubject(null);

  public creditSelected$: Observable<PaymentCredit> = new BehaviorSubject(null);

  public filterSelected$: Observable<PaymentFetchFilter> = new BehaviorSubject(
    null
  );

  public fetchPaymentsFiltered(filter: PaymentFetchFilter): void {}

  public setCreditSelected(creditSelected: PaymentCredit): void {}

  public payLoan(payload: PaymentPayload, data: AlertStepData): void {}
}
