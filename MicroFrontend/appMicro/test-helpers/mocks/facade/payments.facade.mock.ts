import { Injectable } from '@angular/core';
import { PaymentFetchFilter } from '@modules/payments/payment-credits/entities/payment-credits.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

@Injectable()
export class PaymentsFacadeMock extends AppFacadeMock {
  public setPaymentsFiltered(filter: PaymentFetchFilter): void {}
}
