import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

import {
  transferAvalKeyAccountAvalKeySelector,
  transferAvalKeyCompletedSelector,
  transferAvalKeyWorkingSelector
} from '@modules/transfers/pages/transfers-aval-key/store/transfers-aval-key.selector';
import { AccountAvalKey } from '@modules/transfers/pages/transfers-aval-key/entities/transfers-aval-key.interface';
import { fetchAccountAvalKeyAction } from '@modules/transfers/pages/transfers-aval-key/store/transfers-aval-key.actions';

@Injectable()
export class TransfersAvalKeyFacade extends AppFacade {
  public transferAvalKeyAccountAvalKey$: Observable<AccountAvalKey> =
    this.store.pipe(select(transferAvalKeyAccountAvalKeySelector));

  public transferAvalKeyWorking$: Observable<boolean> = this.store.pipe(
    select(transferAvalKeyWorkingSelector)
  );

  public transferAvalKeyCompleted$: Observable<boolean> = this.store.pipe(
    select(transferAvalKeyCompletedSelector)
  );

  public fetchAccountAvalKey(avalKey: string): void {
    this.store.dispatch(fetchAccountAvalKeyAction({ avalKey }));
  }
}
