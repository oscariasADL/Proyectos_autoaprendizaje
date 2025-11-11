import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DefaultAccount } from '@modules/transfers/pages/transfers-default-account/entities/transfers-default-account.entities';
import {
  transferDefaultAccountCompletedSelector,
  transferDefaultAccountDefaultAccountSelector,
  transferDefaultAccountWorkingSelector
} from '@modules/transfers/pages/transfers-default-account/store/transfers-default-account.selector';
import {
  deleteDefaultAccountAction,
  fetchDefaultAccountAction
} from '@modules/transfers/pages/transfers-default-account/store/transfers-default-account.actions';

@Injectable()
export class TransfersDefaultAccountFacade extends AppFacade {
  public transferDefaultAccount$: Observable<DefaultAccount> = this.store.pipe(
    select(transferDefaultAccountDefaultAccountSelector)
  );

  public transferDefaultAccountWorking$: Observable<boolean> = this.store.pipe(
    select(transferDefaultAccountWorkingSelector)
  );

  public transferDefaultAccountCompleted$: Observable<boolean> =
    this.store.pipe(select(transferDefaultAccountCompletedSelector));

  public fetchDefaultAccount(): void {
    this.store.dispatch(fetchDefaultAccountAction());
  }

  public deleteDefaultAccount(): void {
    this.store.dispatch(deleteDefaultAccountAction());
  }
}
