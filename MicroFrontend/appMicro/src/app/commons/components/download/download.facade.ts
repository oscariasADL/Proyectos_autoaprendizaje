import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import {
  downloadAction,
  downloadCleanAction,
  toggleWorkingDownloadAction
} from '@commons/components/download/store/download.action';
import {
  downloadCompletedSelector,
  downloadWorkingSelector
} from '@commons/components/download/store/download.selector';
import { DownloadProperties } from '@commons/entities/download/download.entities';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class DownloadFacade extends AppFacade {
  public working$: Observable<boolean> = this.store.pipe(
    select(downloadWorkingSelector)
  );

  public completed$: Observable<boolean> = this.store.pipe(
    select(downloadCompletedSelector)
  );

  public downloadFile(props: DownloadProperties): void {
    this.store.dispatch(downloadAction({ props }));
  }

  public downloadClean(): void {
    this.store.dispatch(downloadCleanAction());
  }

  public toggleWorkingDownload(working: boolean): void {
    this.store.dispatch(toggleWorkingDownloadAction({ working }));
  }
}
