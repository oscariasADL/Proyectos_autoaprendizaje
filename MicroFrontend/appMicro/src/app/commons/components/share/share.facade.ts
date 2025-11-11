import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppFacade } from '@app/app.facade';
import {
  shareAction,
  shareCleanAction,
  toggleWorkingShareAction
} from '@commons/components/share/store/share.action';
import {
  shareCompletedSelector,
  shareWorkingSelector
} from '@commons/components/share/store/share.selector';
import { ShareProperties } from '@commons/entities/share/share.entities';

@Injectable()
export class ShareFacade extends AppFacade {
  public working$: Observable<boolean> = this.store.pipe(
    select(shareWorkingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(shareCompletedSelector)
  );

  public shareFile(props: ShareProperties): void {
    this.store.dispatch(shareAction({ props }));
  }

  public shareFileClean(): void {
    this.store.dispatch(shareCleanAction());
  }

  public toggleWorkingShare(working: boolean): void {
    this.store.dispatch(toggleWorkingShareAction({ working }));
  }
}
