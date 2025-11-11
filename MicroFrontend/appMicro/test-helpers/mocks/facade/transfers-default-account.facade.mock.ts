import { BehaviorSubject, Observable, of } from 'rxjs';

import { DefaultAccount } from '@modules/transfers/pages/transfers-default-account/entities/transfers-default-account.entities';
import { TypeAccount } from '@commons/entities/product/type-account';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

export class TransfersDefaultAccountFacadeMock extends AppFacadeMock {
  public transferDefaultAccount$: Observable<DefaultAccount> =
    new BehaviorSubject({
      accountId: '2323232',
      accountStatus: true,
      accountType: TypeAccount.SDA
    });

  public transferDefaultAccountWorking$: Observable<boolean> = of(false);

  public transferDefaultAccountCompleted$: Observable<boolean> = of(true);

  public fetchDefaultAccount(): void {}

  public deleteDefaultAccount(): void {}
}
