import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

import { AppFacade } from '@app/app.facade';
import {
  workingSelector,
  completedSelector,
  isActivatedSelector
} from '@modules/wallets/pages/activate-token/store/activate-token.selector';
import { fetchLastTokenAction } from '@modules/wallets/pages/activate-token/store/activate-token.actions';

@Injectable()
export class ActivateTokenFacade extends AppFacade {
  public working$: Observable<boolean> = this.store.pipe(
    select(workingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(completedSelector)
  );

  public isActivated$: Observable<boolean> = this.store.pipe(
    select(isActivatedSelector)
  );

  public fetchLastToken(): void {
    this.store.dispatch(fetchLastTokenAction());
  }
}
