import { Injectable } from '@angular/core';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TransfersCel2celFacadeMock extends AppFacadeMock {
  public transfersCel2celTowardProducts$: Observable<any[]> =
    new BehaviorSubject(null);

  public transfersCel2celBankIds$: Observable<any[]> = new BehaviorSubject(
    null
  );

  public transfersCel2celWorking$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public transfersCel2celCompleted$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public transfersCel2celFetchTowardProductsByPhoneNumber(phone): void {}

  public transfersCel2celCompletedToFalse(): void {}

  public transfersCel2celSetUseTransfiya(useTransfiya: boolean): void {}

  public transfersCel2celUseTransfiya$: Observable<boolean> =
    new BehaviorSubject(false);
}
