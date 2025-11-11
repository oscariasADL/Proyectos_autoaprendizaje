import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { PaymentFetchFilter } from '@modules/payments/payment-credits/entities/payment-credits.interface';
import { setPaymentsFilteredAction } from '@modules/payments/payment-credits/store/payment-credits.actions';

@Injectable()
export class PaymentsFacade extends AppFacade {
  public setPaymentsFiltered(filter: PaymentFetchFilter): void {
    this.store.dispatch(setPaymentsFilteredAction({ filter }));
  }
}
