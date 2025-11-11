import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Balance } from '@commons/entities/product/balance.interface';
import {
  balanceSelector,
  balanceWorkingSelector
} from '@modules/product/store/product.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class AccountsStepFacade extends AppFacade {
  public balance$: Observable<Balance[]> = this.store.pipe(
    select(balanceSelector)
  );

  public balanceWorking$: Observable<boolean> = this.store.pipe(
    select(balanceWorkingSelector)
  );
}
