import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';
import {
  transfersCel2celCompletedSelector,
  transfersCel2celMessageSelector,
  transfersCel2celTowardBankIdsSelector,
  transfersCel2celTowardProductsSelector,
  transfersCel2celUseTransfiyaSelector,
  transfersCel2celWorkingSelector
} from './store/transfers-cel2cel-send.selector';
import {
  completedToFalseAction,
  fetchTowardProductsByPhoneNumberAction,
  setUseTransfiyaAction
} from './store/transfers-cel2cel-send.actions';

@Injectable()
export class TransfersCel2celFacade extends AppFacade {
  public transfersCel2celTowardProducts$: Observable<any[]> = this.store.pipe(
    select(transfersCel2celTowardProductsSelector)
  );

  public transfersCel2celBankIds$: Observable<any[]> = this.store.pipe(
    select(transfersCel2celTowardBankIdsSelector)
  );

  public transfersCel2celWorking$: Observable<boolean> = this.store.pipe(
    select(transfersCel2celWorkingSelector)
  );

  public transfersCel2celCompleted$: Observable<boolean> = this.store.pipe(
    select(transfersCel2celCompletedSelector)
  );

  public transfersCel2celMessage$: Observable<string> = this.store.pipe(
    select(transfersCel2celMessageSelector)
  );

  public transfersCel2celFetchTowardProductsByPhoneNumber(phone: string) {
    this.store.dispatch(fetchTowardProductsByPhoneNumberAction({ phone }));
  }

  public transfersCel2celCompletedToFalse() {
    this.store.dispatch(completedToFalseAction());
  }

  public transfersCel2celUseTransfiya$: Observable<boolean> = this.store.pipe(
    select(transfersCel2celUseTransfiyaSelector)
  );

  public transfersCel2celSetUseTransfiya(useTransfiya: boolean) {
    this.store.dispatch(setUseTransfiyaAction({ useTransfiya }));
  }
}
