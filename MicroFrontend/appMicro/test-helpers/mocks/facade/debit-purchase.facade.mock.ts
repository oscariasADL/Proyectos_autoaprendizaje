import { Injectable } from '@angular/core';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { DebtPurchasePayload } from '@modules/product-options/debit-purchase/entities/debit-purchase.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DebitPurchaseFacadeMock extends AppFacadeMock {
  codeBanks$: Observable<DropdownList[]> = new BehaviorSubject([
    { value: '', label: '' }
  ]);

  public sendDebitPurchase(
    payload: DebtPurchasePayload,
    data: AlertStepData
  ): void {}
}
