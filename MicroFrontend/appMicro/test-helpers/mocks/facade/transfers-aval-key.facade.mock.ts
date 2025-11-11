import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountAvalKey } from '@modules/transfers/pages/transfers-aval-key/entities/transfers-aval-key.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

@Injectable()
export class TransfersAvalKeyFacadeMock extends AppFacadeMock {
  public transferAvalKeyAccountAvalKey$: Observable<AccountAvalKey> =
    new BehaviorSubject(null);

  public transferAvalKeyWorking$: Observable<boolean> = new BehaviorSubject(
    false
  );

  public transferAvalKeyCompleted$: Observable<boolean> = new BehaviorSubject(
    true
  );

  public fetchAccountAvalKey(avalKey: string): void {}
}
