import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';

import { AppFacade } from '@app/app.facade';
import { PocketMovementPayload } from '@modules/pockets/pages/pocket-movements/entities/pocket-movements.interface';
import { fetchPocketMovementsAction } from '@modules/pockets/pages/pocket-movements/store/pocket-movements.actions';

import {
  pocketMovementsCompletedSelector,
  pocketMovementsSelector,
  pocketMovementsWorkingSelector
} from '@modules/pockets/pages/pocket-movements/store/pocket-movements.selector';
import { PocketMovement } from '@app/commons/entities/product/movement.interface';

@Injectable()
export class PocketMovementsFacade extends AppFacade {
  public movements$: Observable<PocketMovement[]> = this.store.pipe(
    select(pocketMovementsSelector)
  );

  public working: Observable<boolean> = this.store.pipe(
    select(pocketMovementsWorkingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(pocketMovementsCompletedSelector)
  );

  public fetchPocketMovements(payload: PocketMovementPayload): void {
    this.store.dispatch(fetchPocketMovementsAction({ payload }));
  }
}
