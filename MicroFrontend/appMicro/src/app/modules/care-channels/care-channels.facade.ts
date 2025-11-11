import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Adviser } from './entities/adviser.interface';
import { fetchAdviserAction } from './store/care-channels.action';
import {
  adviserSelector,
  adviserWorkingSelector
} from './store/care-channels.selector';

@Injectable()
export class CareChannelsFacade extends AppFacade {
  public adviser$: Observable<Adviser> = this.store.pipe(
    select(adviserSelector)
  );
  public working$: Observable<boolean> = this.store.pipe(
    select(adviserWorkingSelector)
  );

  public fetchAdviser(): void {
    this.store.dispatch(fetchAdviserAction());
  }
}
