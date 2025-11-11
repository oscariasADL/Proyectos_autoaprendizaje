import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Pocket } from '@modules/pockets/entities/pockets.interface';
import { PocketDetailPayload } from '@modules/pockets/pages/pocket-detail/entities/pocket-detail.interface';
import { fetchPocketDetailAction } from '@modules/pockets/pages/pocket-detail/store/pocket-detail.actions';
import {
  pocketDetailCompletedSelector,
  pocketDetailDataSelector,
  pocketDetailWorkingSelector
} from '@modules/pockets/pages/pocket-detail/store/pocket-detail.selector';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class PocketDetailFacade extends AppFacade {
  public pocket$: Observable<Pocket> = this.store.pipe(
    select(pocketDetailDataSelector)
  );

  public working$: Observable<boolean> = this.store.pipe(
    select(pocketDetailWorkingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(pocketDetailCompletedSelector)
  );

  public fetchPocketDetail(payload: PocketDetailPayload): void {
    this.store.dispatch(fetchPocketDetailAction({ payload }));
  }
}
