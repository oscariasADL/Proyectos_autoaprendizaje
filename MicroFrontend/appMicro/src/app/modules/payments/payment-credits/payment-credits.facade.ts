import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { PaymentPayload } from '@modules/payments/payment-credits/entities/pay-loan.interface';
import {
  PaymentCredit,
  PaymentCredits,
  PaymentFetchFilter
} from '@modules/payments/payment-credits/entities/payment-credits.interface';
import {
  fetchPaymentsFilteredAction,
  payLoanAction,
  setCreditSelectedAction
} from '@modules/payments/payment-credits/store/payment-credits.actions';
import {
  creditSelectedSelector,
  filterSelectedSelector,
  paymentsCompletedSelectors,
  paymentsDataSelectors,
  paymentsWorkingSelectors
} from '@modules/payments/payment-credits/store/payment-credits.selector';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentCreditsFacade extends AppFacade {
  public payments$: Observable<PaymentCredits> = this.store.pipe(
    select(paymentsDataSelectors)
  );

  public paymentsWorking$: Observable<boolean> = this.store.pipe(
    select(paymentsWorkingSelectors)
  );

  public paymentsCompleted$: Observable<boolean> = this.store.pipe(
    select(paymentsCompletedSelectors)
  );

  public creditSelected$: Observable<PaymentCredit> = this.store.pipe(
    select(creditSelectedSelector)
  );

  public filterSelected$: Observable<PaymentFetchFilter> = this.store.pipe(
    select(filterSelectedSelector)
  );

  public fetchPaymentsFiltered(filter: PaymentFetchFilter): void {
    this.store.dispatch(fetchPaymentsFilteredAction({ filter }));
  }

  public setCreditSelected(creditSelected: PaymentCredit): void {
    this.store.dispatch(setCreditSelectedAction({ creditSelected }));
  }

  public payLoan(payload: PaymentPayload, data: AlertStepData): void {
    this.store.dispatch(payLoanAction({ payload, data }));
  }
}
